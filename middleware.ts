import { NextResponse, type NextRequest } from 'next/server';

const kymnisHosts = new Set(['kymnis.com', 'www.kymnis.com']);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase();

  if (!host || !kymnisHosts.has(host)) return NextResponse.next();

  const url = request.nextUrl.clone();
  const { pathname } = url;

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
