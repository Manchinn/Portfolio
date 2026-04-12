import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login page + login API — always accessible
  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  // Public read endpoints — no auth needed
  const isPublicRead =
    request.method === 'GET' &&
    (pathname === '/api/prompts' || /^\/api\/prompts\/[^/]+$/.test(pathname));

  if (isPublicRead) return NextResponse.next();

  // All other /admin/* and /api/prompts/* routes require auth
  const token =
    request.headers.get('x-admin-token') ||
    request.cookies.get('admin_token')?.value;

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    if (pathname.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/prompts/:path*', '/api/admin/:path*'],
};
