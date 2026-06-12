import { NextResponse } from 'next/server';
import { createCrmLead } from '@/lib/crm';
import { storeLeadSubmission } from '@/lib/db';
import { sendLeadNotifications } from '@/lib/email';
import { env } from '@/lib/env';
import { enforceRateLimit, getClientIp, verifyBotProtection } from '@/lib/security';
import { contactLeadSchema } from '@/lib/validators';

function routeForTopic(topic: string) {
  if (topic === 'Partnership') return { route: env.partnershipsRouteEmail, prefix: '[EterSolis Partnership Inquiry]' };
  if (topic === 'Executive') return { route: env.ceoRouteEmail, prefix: '[EterSolis Executive Inquiry]' };
  if (topic === 'Scientific / CSO') return { route: env.csoRouteEmail, prefix: '[EterSolis CSO Inquiry]' };
  if (topic === 'Careers / Associate') return { route: env.csoRouteEmail, prefix: '[EterSolis Talent Inquiry]' };
  if (topic === 'Privacy') return { route: env.privacyRouteEmail, prefix: '[EterSolis Privacy Request]' };
  if (topic === 'Consultation / Assessment') return { route: env.infoRouteEmail, prefix: '[EterSolis Assessment Request]' };
  return { route: env.infoRouteEmail, prefix: '[EterSolis General Inquiry]' };
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await enforceRateLimit(ip);
  if (!rateLimit.ok) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const botCheck = await verifyBotProtection(String(raw.turnstileToken ?? raw['cf-turnstile-response'] ?? ''), ip);
  if (!botCheck.ok) return NextResponse.json({ error: 'Verification failed.' }, { status: 403 });

  const parsed = contactLeadSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });

  const route = routeForTopic(parsed.data.topic);
  const submission = await storeLeadSubmission({ leadType: 'contact', ip, ...parsed.data });
  await createCrmLead({ leadType: 'contact', submissionId: submission.id, ...parsed.data });
  await sendLeadNotifications({
    submissionId: submission.id,
    route: route.route,
    subjectPrefix: route.prefix,
    submitterEmail: parsed.data.email,
    leadType: 'contact',
    summary: `Name: ${parsed.data.name}\nCompany: ${parsed.data.company ?? 'Not provided'}\nTopic: ${parsed.data.topic}`
  });

  return NextResponse.json({ ok: true, submissionId: submission.id, message: 'Inquiry received for EterSolis review.' });
}
