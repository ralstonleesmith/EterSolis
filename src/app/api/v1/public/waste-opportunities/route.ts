import { env } from '@/lib/env';
import { handleLeadSubmission } from '@/lib/leadSubmission';
import { wasteOpportunitySchema } from '@/lib/validators';
import { rateLimitPolicies } from '@/lib/api';

export async function POST(request: Request) {
  return handleLeadSubmission(request, {
    leadType: 'waste',
    schema: wasteOpportunitySchema,
    routeFor: () => ({ route: env.wasteRouteEmail, prefix: '[EterSolis Waste Opportunity]' }),
    submitterEmail: (data) => data.email,
    summary: (data) => `Company: ${data.companyName}\nContact: ${data.contactName}\nCountry: ${data.country}\nRegion: ${data.region ?? 'Not provided'}\nMaterial: ${data.materialCategory}\nFrequency: ${data.frequency}\nHazard flag: ${data.hazardFlag ? 'Yes' : 'No'}\nConfidentiality: ${data.confidentialityLevel}`,
    successMessage: 'Submission received for non-binding EterSolis review.',
    apiMode: 'v1',
    rateLimitPolicy: rateLimitPolicies.publicWaste
  });
}
