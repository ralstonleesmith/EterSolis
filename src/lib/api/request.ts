import { createHash, randomUUID } from 'node:crypto';
import { getClientIp, hashClientIp } from '@/lib/security';

export function createRequestId(request?: Request) {
  const incoming = request?.headers.get('x-request-id')?.trim();
  if (incoming && /^[a-zA-Z0-9_.:-]{8,120}$/.test(incoming)) return incoming;
  return `req_${randomUUID()}`;
}

export function userAgentHash(request: Request) {
  const userAgent = request.headers.get('user-agent') ?? 'unknown';
  return createHash('sha256').update(userAgent).digest('hex');
}

export function requestContext(request: Request, requestId = createRequestId(request)) {
  const ip = getClientIp(request);
  return {
    requestId,
    ip,
    ipHash: hashClientIp(ip),
    userAgentHash: userAgentHash(request),
    route: new URL(request.url).pathname,
    method: request.method
  };
}

export function idempotencyKey(parts: Array<string | number | boolean | undefined | null>) {
  return createHash('sha256')
    .update(parts.map((part) => String(part ?? '')).join('|').toLowerCase().trim())
    .digest('hex');
}
