import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api';
const TOKEN_STORAGE_KEY = 'auth_token';

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Get token from cookie
  const token = request.cookies.get(TOKEN_STORAGE_KEY)?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
    }

    const user = await response.json();
    const isAdmin = user.role === 'ADMIN' || user.role === 'ROLE_ADMIN';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(request.nextUrl.pathname)}`, request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*']
};

