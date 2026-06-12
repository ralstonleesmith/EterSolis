import { NextResponse } from 'next/server';
import { createCrmLead } from '@/lib/crm';
import { storeLeadSubmission } from '@/lib/db';
import { sendLeadNotifications } from '@/lib/email';
import { env } from '@/lib/env';
import { enforceRateLimit, getClientIp, verifyBotProtection } from '@/lib/security';
import { wasteOpportunitySchema } from '@/lib/validators';

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await enforceRateLimit(ip);
  if (!rateLimit.ok) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const botCheck = await verifyBotProtection(String(raw.turnstileToken ?? raw['cf-turnstile-response'] ?? ''), ip);
  if (!botCheck.ok) return NextResponse.json({ error: 'Verification failed.' }, { status: 403 });

  const parsed = wasteOpportunitySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });

  const submission = await storeLeadSubmission({ leadType: 'waste', ip, ...parsed.data });
  await createCrmLead({ leadType: 'waste', submissionId: submission.id, ...parsed.data });
  await sendLeadNotifications({
    submissionId: submission.id,
    route: env.wasteRouteEmail,
    subjectPrefix: '[EterSolis Waste Opportunity]',
    submitterEmail: parsed.data.email,
    leadType: 'waste',
    summary: `Company: ${parsed.data.companyName}\nContact: ${parsed.data.contactName}\nCountry: ${parsed.data.country}\nRegion: ${parsed.data.region ?? 'Not provided'}\nMaterial: ${parsed.data.materialCategory}\nFrequency: ${parsed.data.frequency}\nHazard flag: ${parsed.data.hazardFlag ? 'Yes' : 'No'}\nConfidentiality: ${parsed.data.confidentialityLevel}`
  });

  return NextResponse.json({ ok: true, submissionId: submission.id, message: 'Submission received for non-binding EterSolis review.' });
}
