import { contactLeadSchema } from '@/lib/validators';
import { handleLeadSubmission } from '@/lib/leadSubmission';
import { env } from '@/lib/env';
import { rateLimitPolicies } from '@/lib/api';

export async function POST(request: Request) {
  return handleLeadSubmission(request, {
    leadType: 'contact',
    schema: contactLeadSchema,
    routeFor: (data) => {
      const route = data.topic === 'Partnership' ? env.partnershipsRouteEmail
        : data.topic === 'KYMNIS' ? env.kymnisRouteEmail
          : data.topic === 'Privacy' ? env.privacyRouteEmail
            : data.topic === 'Executive' ? env.ceoRouteEmail
              : data.topic === 'Scientific / CSO' ? env.csoRouteEmail
                : env.infoRouteEmail;
      return { route, prefix: '[EterSolis Contact]' };
    },
    submitterEmail: (data) => data.email,
    summary: (data) => `Name: ${data.name}\nCompany: ${data.company ?? 'Not provided'}\nTopic: ${data.topic}\nMessage: ${data.message}`,
    successMessage: 'Inquiry received for controlled EterSolis review.',
    apiMode: 'v1',
    rateLimitPolicy: rateLimitPolicies.publicLead
  });
}
