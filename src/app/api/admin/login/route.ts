import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const secret = String(formData.get('secret') ?? '');
  const next = String(formData.get('next') ?? '/admin');
  const configured = process.env.ADMIN_SHARED_SECRET;

  if (configured && secret !== configured) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL(next.startsWith('/admin') ? next : '/admin', request.url));
  response.cookies.set('etersolis_admin', configured ?? 'development-admin', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin'
  });
  return response;
}
