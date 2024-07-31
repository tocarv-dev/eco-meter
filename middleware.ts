import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/survey') {
    return NextResponse.redirect(new URL('/survey/info', request.url));
  }

  if(pathname === '/results' && cookies().get('g2c_formToken')) {
    const id:any = cookies().get('g2c_formToken');
    return NextResponse.redirect(new URL(`/results/${id.value}`, request.url));
  }
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
