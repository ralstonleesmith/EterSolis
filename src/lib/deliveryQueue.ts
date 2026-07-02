import { getPool } from '@/lib/db';

export type OutboundEventInput = {
  requestId?: string;
  eventType: string;
  destination: string;
  payload: Record<string, unknown>;
  serviceRequestId?: string;
  leadSubmissionId?: string;
  opportunityId?: string;
};

const retryDelaysMs = [0, 60_000, 5 * 60_000, 30 * 60_000, 2 * 60 * 60_000];

export function nextRetryAt(attempts: number) {
  const delay = retryDelaysMs[Math.min(attempts, retryDelaysMs.length - 1)] ?? retryDelaysMs[retryDelaysMs.length - 1];
  return new Date(Date.now() + delay);
}

export async function enqueueOutboundEvent(input: OutboundEventInput) {
  const result = await getPool().query(
    `insert into outbound_events (
      request_id, event_type, destination, payload, service_request_id, lead_submission_id, opportunity_id
    ) values ($1,$2,$3,$4::jsonb,$5,$6,$7)
    returning id, status, attempts, next_attempt_at`,
    [
      input.requestId ?? null,
      input.eventType,
      input.destination,
      JSON.stringify(input.payload),
      input.serviceRequestId ?? null,
      input.leadSubmissionId ?? null,
      input.opportunityId ?? null
    ]
  );
  return result.rows[0];
}

export async function listOutboundEvents(status?: string, limit = 100) {
  const result = await getPool().query(
    `select id, request_id, event_type, destination, status, attempts, max_attempts, next_attempt_at,
            last_error, service_request_id, lead_submission_id, opportunity_id, created_at, updated_at
       from outbound_events
      where ($1::text is null or status = $1)
      order by created_at desc
      limit $2`,
    [status ?? null, limit]
  );
  return result.rows;
}

export async function markOutboundEventForRetry(id: string, actor = 'admin') {
  const result = await getPool().query(
    `update outbound_events
        set status = 'queued',
            attempts = 0,
            next_attempt_at = now(),
            last_error = null,
            updated_at = now()
      where id = $1
      returning id, request_id, event_type, destination, status, attempts, max_attempts, next_attempt_at,
                last_error, service_request_id, lead_submission_id, opportunity_id, created_at, updated_at`,
    [id]
  );
  await getPool().query(
    `insert into admin_actions (action_type, actor, metadata)
     values ('outbound_event_retry', $1, $2::jsonb)`,
    [actor, JSON.stringify({ outboundEventId: id })]
  ).catch(() => undefined);
  return result.rows[0] ?? null;
}

export async function markOutboundEventResolved(id: string, actor = 'admin') {
  const result = await getPool().query(
    `update outbound_events
        set status = 'resolved',
            updated_at = now()
      where id = $1
      returning id, request_id, event_type, destination, status, attempts, max_attempts, next_attempt_at,
                last_error, service_request_id, lead_submission_id, opportunity_id, created_at, updated_at`,
    [id]
  );
  await getPool().query(
    `insert into admin_actions (action_type, actor, metadata)
     values ('outbound_event_resolved', $1, $2::jsonb)`,
    [actor, JSON.stringify({ outboundEventId: id })]
  ).catch(() => undefined);
  return result.rows[0] ?? null;
}
