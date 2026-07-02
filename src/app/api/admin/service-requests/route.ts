import { NextResponse } from 'next/server';
import { listServiceRequests } from '@/lib/serviceRequests';

export const dynamic = 'force-dynamic';

function isAdmin(request: Request) {
  const configured = process.env.ADMIN_SHARED_SECRET;
  if (!configured) return process.env.NODE_ENV !== 'production';
  return request.headers.get('x-admin-secret') === configured;
}

export async function GET(request: Request) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  const rows = await listServiceRequests();
  return NextResponse.json({ ok: true, serviceRequests: rows });
}
