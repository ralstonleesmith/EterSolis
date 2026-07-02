import { contactLeadSchema } from '@/lib/validators';
import { handleLeadSubmission } from '@/lib/leadSubmission';
import { env } from '@/lib/env';
import { rateLimitPolicies } from '@/lib/api';

export async function POST(request: Request) {
  return handleLeadSubmission(request, {
    leadType: 'contact',
    schema: contactLeadSchema,
    routeFor: () => ({ route: env.kymnisRouteEmail, prefix: '[KYMNIS Interest]' }),
    submitterEmail: (data) => data.email,
    summary: (data) => `Name: ${data.name}\nCompany: ${data.company ?? 'Not provided'}\nTopic: ${data.topic}\nMessage: ${data.message}`,
    successMessage: 'KYMNIS interest received for controlled review.',
    apiMode: 'v1',
    rateLimitPolicy: rateLimitPolicies.publicLead
  });
}
