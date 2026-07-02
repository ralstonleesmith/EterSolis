import { apiError, apiOk, createRequestId } from '@/lib/api';
import { listOutboundEvents } from '@/lib/deliveryQueue';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request) {
  const requestId = createRequestId(request);
  if (!isAdmin(request)) return apiError('UNAUTHORIZED', 'Unauthorized.', 401, requestId);
  const url = new URL(request.url);
  const status = url.searchParams.get('status') ?? undefined;
  const events = await listOutboundEvents(status);
  return apiOk({ events }, requestId);
}
