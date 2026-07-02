import { apiOk, createRequestId } from '@/lib/api';

export async function POST(request: Request) {
  const requestId = createRequestId(request);
  await request.json().catch(() => ({}));
  return apiOk({ received: true, mode: 'crm-webhook-placeholder' }, requestId);
}
