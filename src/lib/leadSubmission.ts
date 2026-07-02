import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { apiError, apiOk, enforceOperationalRateLimit, requestContext, type RateLimitPolicy } from '@/lib/api';
import { createCrmLead } from '@/lib/crm';
import { recordAuditEvent, storeLeadSubmission } from '@/lib/db';
import { enqueueOutboundEvent } from '@/lib/deliveryQueue';
import { sendLeadNotifications } from '@/lib/email';
import { enforceRateLimit, getClientIp, hashClientIp, verifyBotProtection } from '@/lib/security';

type SubmissionRoute = {
  route: string;
  prefix: string;
};

type SubmissionConfig<Schema extends z.ZodTypeAny> = {
  leadType: 'contact' | 'waste';
  schema: Schema;
  routeFor: (data: z.infer<Schema>) => SubmissionRoute;
  submitterEmail: (data: z.infer<Schema>) => string;
  summary: (data: z.infer<Schema>) => string;
  successMessage: string;
  apiMode?: 'legacy' | 'v1';
  rateLimitPolicy?: RateLimitPolicy;
};

function isSupportedFormContentType(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  return contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');
}

function publicError(status: number, error: string) {
  return NextResponse.json({ error }, { status });
}

async function auditFailure(eventType: string, metadata: Record<string, unknown>, leadSubmissionId?: string) {
  await recordAuditEvent(eventType, metadata, leadSubmissionId).catch(() => undefined);
}

function submissionError(apiMode: 'legacy' | 'v1' | undefined, status: number, error: string, requestId?: string) {
  if (apiMode === 'v1') {
    const code = status === 415 ? 'UNSUPPORTED_MEDIA_TYPE'
      : status === 429 ? 'RATE_LIMITED'
        : status === 403 ? 'FORBIDDEN'
          : status === 400 ? 'VALIDATION_FAILED'
            : 'BAD_REQUEST';
    return apiError(code, error, status, requestId);
  }
  return publicError(status, error);
}

export async function handleLeadSubmission<Schema extends z.ZodTypeAny>(request: Request, config: SubmissionConfig<Schema>) {
  const context = requestContext(request);
  if (!isSupportedFormContentType(request)) return submissionError(config.apiMode, 415, 'Unsupported submission format.', context.requestId);

  const ip = getClientIp(request);
  const rateLimit = config.rateLimitPolicy
    ? await enforceOperationalRateLimit(context.ipHash, config.rateLimitPolicy)
    : await enforceRateLimit(ip);
  if (!rateLimit.ok) return submissionError(config.apiMode, 429, 'Too many requests.', context.requestId);

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const botCheck = await verifyBotProtection(String(raw.turnstileToken ?? raw['cf-turnstile-response'] ?? ''), ip);
  if (!botCheck.ok) return submissionError(config.apiMode, 403, 'Verification failed.', context.requestId);

  const parsed = config.schema.safeParse(raw);
  if (!parsed.success) return submissionError(config.apiMode, 400, 'Invalid submission.', context.requestId);

  const route = config.routeFor(parsed.data);
  const submissionSummary = config.summary(parsed.data);
  const payload = {
    leadType: config.leadType,
    requestId: context.requestId,
    ipHash: hashClientIp(ip),
    ...parsed.data
  };
  const submission = await storeLeadSubmission(payload);

  await Promise.all([
    enqueueOutboundEvent({
      requestId: context.requestId,
      eventType: `${config.leadType}_crm_delivery`,
      destination: process.env.CRM_WEBHOOK_URL ? 'configured-crm-webhook' : 'not-configured',
      leadSubmissionId: submission.id,
      payload: { leadType: config.leadType, submissionId: submission.id, ...parsed.data }
    }),
    enqueueOutboundEvent({
      requestId: context.requestId,
      eventType: `${config.leadType}_email_delivery`,
      destination: route.route,
      leadSubmissionId: submission.id,
      payload: {
        submissionId: submission.id,
        subjectPrefix: route.prefix,
        submitterEmail: config.submitterEmail(parsed.data),
        summary: submissionSummary
      }
    })
  ]).catch(() => undefined);

  const deliveries = [
    {
      provider: 'crm',
      eventType: 'crm_delivery_failed',
      destination: process.env.CRM_WEBHOOK_URL ? 'configured-crm-webhook' : 'not-configured',
      run: () => createCrmLead({ leadType: config.leadType, submissionId: submission.id, ...parsed.data })
    },
    {
      provider: 'email',
      eventType: 'email_delivery_failed',
      destination: route.route,
      run: () => sendLeadNotifications({
        submissionId: submission.id,
        route: route.route,
        subjectPrefix: route.prefix,
        submitterEmail: config.submitterEmail(parsed.data),
        leadType: config.leadType,
        summary: submissionSummary
      })
    }
  ] as const;

  const deliveryResults = await Promise.allSettled(deliveries.map((delivery) => delivery.run()));

  await Promise.all(
    deliveryResults.map((result, index) => {
      if (result.status === 'fulfilled') return undefined;
      const delivery = deliveries[index];
      return auditFailure(delivery.eventType, {
        submissionId: submission.id,
        leadType: config.leadType,
        provider: delivery.provider,
        destination: delivery.destination,
        error: result.reason instanceof Error ? result.reason.message : 'Unknown delivery failure'
      }, submission.id);
    })
  );

  const data = { submissionId: submission.id, message: config.successMessage };
  if (config.apiMode === 'v1') return apiOk(data, context.requestId);
  return NextResponse.json({ ok: true, ...data });
}
