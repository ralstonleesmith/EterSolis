import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { createCrmLead } from '@/lib/crm';
import { recordAuditEvent, storeLeadSubmission } from '@/lib/db';
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

export async function handleLeadSubmission<Schema extends z.ZodTypeAny>(request: Request, config: SubmissionConfig<Schema>) {
  if (!isSupportedFormContentType(request)) return publicError(415, 'Unsupported submission format.');

  const ip = getClientIp(request);
  const rateLimit = await enforceRateLimit(ip);
  if (!rateLimit.ok) return publicError(429, 'Too many requests.');

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const botCheck = await verifyBotProtection(String(raw.turnstileToken ?? raw['cf-turnstile-response'] ?? ''), ip);
  if (!botCheck.ok) return publicError(403, 'Verification failed.');

  const parsed = config.schema.safeParse(raw);
  if (!parsed.success) return publicError(400, 'Invalid submission.');

  const route = config.routeFor(parsed.data);
  const payload = {
    leadType: config.leadType,
    ipHash: hashClientIp(ip),
    ...parsed.data
  };
  const submission = await storeLeadSubmission(payload);

  const deliveryResults = await Promise.allSettled([
    createCrmLead({ leadType: config.leadType, submissionId: submission.id, ...parsed.data }),
    sendLeadNotifications({
      submissionId: submission.id,
      route: route.route,
      subjectPrefix: route.prefix,
      submitterEmail: config.submitterEmail(parsed.data),
      leadType: config.leadType,
      summary: config.summary(parsed.data)
    })
  ]);

  await Promise.all(
    deliveryResults.map((result, index) => {
      if (result.status === 'fulfilled') return undefined;
      return auditFailure(index === 0 ? 'crm_delivery_failed' : 'email_delivery_failed', {
        leadType: config.leadType,
        error: result.reason instanceof Error ? result.reason.message : 'Unknown delivery failure'
      }, submission.id);
    })
  );

  return NextResponse.json({ ok: true, submissionId: submission.id, message: config.successMessage });
}
