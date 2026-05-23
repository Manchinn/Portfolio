import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRead =
    request.method === 'GET' &&
    (pathname === '/api/prompts' || /^\/api\/prompts\/[^/]+$/.test(pathname));

  if (isPublicRead) return NextResponse.next();

  const token =
    request.headers.get('x-admin-token') ||
    request.cookies.get('admin_token')?.value;

  if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/prompts/:path*'],
};
