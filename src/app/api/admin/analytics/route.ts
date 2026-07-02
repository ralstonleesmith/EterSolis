import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getPool().query(
    `select event_area, event_name, count(*)::int as count
       from analytics_events
      group by event_area, event_name
      order by count desc`
  );
  return NextResponse.json({ ok: true, events: result.rows });
}
