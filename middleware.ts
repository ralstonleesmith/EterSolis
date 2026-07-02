import { NextResponse, type NextRequest } from 'next/server';

const kymnisHosts = new Set(['kymnis.com', 'www.kymnis.com']);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const secret = process.env.ADMIN_SHARED_SECRET;
    const session = request.cookies.get('etersolis_admin')?.value;
    if (secret && session !== secret) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
  }

  if (!host || !kymnisHosts.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();

  if (pathname === '/') {
    url.pathname = '/kymnis';
    return NextResponse.rewrite(url);
  }

  if (!pathname.startsWith('/kymnis')) {
    url.pathname = `/kymnis${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|media|brand|robots.txt|sitemap.xml).*)']
};
