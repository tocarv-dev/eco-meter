import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from "next-auth/react"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/survey') {
    return NextResponse.redirect(new URL('/survey/info', request.url));
  }

  if(pathname === '/results' && cookies().get('g2c_formToken')) {
    const id:any = cookies().get('g2c_formToken');
    return NextResponse.redirect(new URL(`/results/${id.value}`, request.url));
  }
}
export { auth as auth_middleware } from "@/lib/auth/auth"

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
