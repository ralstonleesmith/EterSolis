import { NextResponse } from 'next/server';
import { getServiceRequestByToken } from '@/lib/serviceRequests';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ token: string }> }) {
  const resolvedParams = await params;
  const record = await getServiceRequestByToken(resolvedParams.token);
  if (!record) return NextResponse.json({ error: 'Service request not found.' }, { status: 404 });
  return NextResponse.json({ ok: true, serviceRequest: record });
}
