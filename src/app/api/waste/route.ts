import { NextResponse } from 'next/server';
import { createCrmLead } from '@/lib/crm';
import { storeLeadSubmission } from '@/lib/db';
import { sendLeadNotifications } from '@/lib/email';
import { env } from '@/lib/env';
import { enforceRateLimit, verifyBotProtection } from '@/lib/security';
import { wasteOpportunitySchema } from '@/lib/validators';

export async function POST(request: Request) {
  const rateLimit = await enforceRateLimit();
  if (!rateLimit.ok) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  const botCheck = await verifyBotProtection();
  if (!botCheck.ok) return NextResponse.json({ error: 'Verification failed.' }, { status: 403 });

  const formData = await request.formData();
  const raw = Object.fromEntries(formData.entries());
  const parsed = wasteOpportunitySchema.safeParse(raw);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const submission = await storeLeadSubmission({ leadType: 'waste', ...parsed.data });
  await createCrmLead({ leadType: 'waste', submissionId: submission.id, ...parsed.data });
  await sendLeadNotifications({
    submissionId: submission.id,
    route: env.wasteRouteEmail,
    subjectPrefix: '[EterSolis Waste Opportunity]',
    submitterEmail: parsed.data.email
  });

  return NextResponse.json({
    ok: true,
    submissionId: submission.id,
    message: 'Submission received for non-binding EterSolis review.'
  });
}
