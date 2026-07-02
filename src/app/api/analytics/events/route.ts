import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { analyticsEventSchema } from '@/lib/operations/schemas';

export async function POST(request: Request) {
  const parsed = analyticsEventSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid analytics event.' }, { status: 400 });

  await getPool().query(
    `insert into analytics_events (service_request_id, session_id, event_name, event_area, payload)
     values ($1,$2,$3,$4,$5::jsonb)`,
    [
      parsed.data.serviceRequestId ?? null,
      parsed.data.sessionId ?? null,
      parsed.data.eventName,
      parsed.data.eventArea,
      JSON.stringify(parsed.data.payload ?? {})
    ]
  );

  return NextResponse.json({ ok: true });
}
