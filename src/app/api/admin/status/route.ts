import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, admin: 'service-request-mvp' });
}
