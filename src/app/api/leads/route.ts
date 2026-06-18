import { env } from '@/lib/env';
import { handleLeadSubmission } from '@/lib/leadSubmission';
import { contactLeadSchema } from '@/lib/validators';

function routeForTopic(topic: string) {
  if (topic === 'Partnership') return { route: env.partnershipsRouteEmail, prefix: '[EterSolis Partnership Inquiry]' };
  if (topic === 'Executive') return { route: env.ceoRouteEmail, prefix: '[EterSolis Executive Inquiry]' };
  if (topic === 'Scientific / CSO') return { route: env.csoRouteEmail, prefix: '[EterSolis CSO Inquiry]' };
  if (topic === 'Careers / Associate') return { route: env.csoRouteEmail, prefix: '[EterSolis Talent Inquiry]' };
  if (topic === 'Privacy') return { route: env.privacyRouteEmail, prefix: '[EterSolis Privacy Request]' };
  if (topic === 'Wastewater Treatment') return { route: env.infoRouteEmail, prefix: '[EterSolis Wastewater Assessment Request]' };
  if (topic === 'Consultation / Assessment') return { route: env.infoRouteEmail, prefix: '[EterSolis Assessment Request]' };
  return { route: env.infoRouteEmail, prefix: '[EterSolis General Inquiry]' };
}

export async function POST(request: Request) {
  return handleLeadSubmission(request, {
    leadType: 'contact',
    schema: contactLeadSchema,
    routeFor: (data) => routeForTopic(data.topic),
    submitterEmail: (data) => data.email,
    summary: (data) => `Name: ${data.name}\nCompany: ${data.company ?? 'Not provided'}\nTopic: ${data.topic}`,
    successMessage: 'Inquiry received for EterSolis review.'
  });
}
