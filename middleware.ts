import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'solid-shop-secret');

const publicRoutes = ['/login', '/register', '/'];
const protectedRoutes = ['/products'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const token = request.cookies.get('solid-shop-token')?.value;
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (token) {
    try {
      await jwtVerify(token, secret);
    } catch (error) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('solid-shop-token');
      return response;
    }
  }
  
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|shop-icon.svg|public).*)',
  ],
};
