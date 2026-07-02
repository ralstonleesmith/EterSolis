import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { adminStatusUpdateSchema } from '@/lib/operations/schemas';

export const dynamic = 'force-dynamic';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const resolvedParams = await params;
  const result = await getPool().query('select * from service_requests where id = $1 limit 1', [resolvedParams.id]);
  if (!result.rows[0]) return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, serviceRequest: result.rows[0] });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const resolvedParams = await params;
  const parsed = adminStatusUpdateSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status update.' }, { status: 400 });

  await getPool().query(
    `update service_requests
        set status = coalesce($2, status),
            payment_status = coalesce($3, payment_status),
            pickup_status = coalesce($4, pickup_status),
            delivery_status = coalesce($5, delivery_status),
            assigned_operator = coalesce($6, assigned_operator),
            updated_at = now()
      where id = $1`,
    [
      resolvedParams.id,
      parsed.data.status ?? null,
      parsed.data.paymentStatus ?? null,
      parsed.data.pickupStatus ?? null,
      parsed.data.deliveryStatus ?? null,
      parsed.data.assignedOperator ?? null
    ]
  );
  await getPool().query(
    `insert into admin_actions (service_request_id, action_type, actor, metadata)
     values ($1,'admin_status_update','admin',$2::jsonb)`,
    [resolvedParams.id, JSON.stringify(parsed.data)]
  );
  return NextResponse.json({ ok: true });
}
