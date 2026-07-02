import { apiError, apiOk, createRequestId } from '@/lib/api';
import { markOutboundEventForRetry } from '@/lib/deliveryQueue';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const requestId = createRequestId(request);
  if (!isAdmin(request)) return apiError('UNAUTHORIZED', 'Unauthorized.', 401, requestId);
  const { id } = await params;
  const event = await markOutboundEventForRetry(id);
  if (!event) return apiError('NOT_FOUND', 'Delivery event not found.', 404, requestId);
  return apiOk({ event }, requestId);
}
