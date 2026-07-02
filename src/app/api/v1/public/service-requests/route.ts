import { handleServiceRequestSubmission } from '@/lib/serviceRequests';

export async function POST(request: Request) {
  return handleServiceRequestSubmission(request, { apiMode: 'v1' });
}
