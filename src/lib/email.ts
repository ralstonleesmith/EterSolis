import nodemailer from 'nodemailer';
import { generalSubmitterConfirmation, internalNotification, wasteSubmitterConfirmation } from '@/lib/emailTemplates';

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASS must be configured on the EterSolis server before public form submissions are enabled.');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

export async function sendLeadNotifications(input: {
  submissionId: string;
  route: string;
  subjectPrefix: string;
  submitterEmail: string;
  leadType?: 'waste' | 'contact';
  summary?: string;
}) {
  const from = process.env.MAIL_FROM ?? 'EterSolis <no-reply@etersolis.com>';
  const replyTo = input.route;
  const transport = getTransport();
  const submitter = input.leadType === 'waste'
    ? wasteSubmitterConfirmation(input.submissionId)
    : generalSubmitterConfirmation(input.submissionId);
  const internal = internalNotification({
    submissionId: input.submissionId,
    subjectPrefix: input.subjectPrefix,
    leadType: input.leadType ?? 'contact',
    summary: input.summary ?? 'Submission summary was not provided.'
  });

  await transport.sendMail({ from, to: input.route, replyTo: input.submitterEmail, subject: internal.subject, text: internal.text });
  await transport.sendMail({ from, to: input.submitterEmail, replyTo, subject: submitter.subject, text: submitter.text });

  return { accepted: true, submissionId: input.submissionId, route: input.route, subjectPrefix: input.subjectPrefix };
}
