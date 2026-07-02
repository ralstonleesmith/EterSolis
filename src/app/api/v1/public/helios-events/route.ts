import { apiError, apiOk, createRequestId, enforceOperationalRateLimit, rateLimitPolicies, requestContext } from '@/lib/api';
import { getPool } from '@/lib/db';

export async function POST(request: Request) {
  const requestId = createRequestId(request);
  const context = requestContext(request, requestId);
  const rateLimit = await enforceOperationalRateLimit(context.ipHash, rateLimitPolicies.heliosEvents);
  if (!rateLimit.ok) return apiError('RATE_LIMITED', 'Too many Helios events.', 429, requestId);

  const payload = await request.json().catch(() => ({}));
  await getPool().query(
    `insert into analytics_events (session_id, event_name, event_area, payload)
     values ($1,$2,'helios',$3::jsonb)`,
    [payload.sessionId ?? null, String(payload.eventName ?? 'helios_event'), JSON.stringify({ requestId, ...payload })]
  );
  return apiOk({ accepted: true }, requestId);
}
