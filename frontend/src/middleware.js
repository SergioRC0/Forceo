// frontend/src/middleware.ts
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl.clone();

  // 1) Protejo /profile de no-authenticated
  if (!token && url.pathname.startsWith('/profile')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 2) Si ya tengo token y estoy en login o register, voy a perfil
  if (token && (url.pathname.startsWith('/login') || url.pathname.startsWith('/register'))) {
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/login/:path*', '/register/:path*'],
};
