import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { LOGIN_ROUTE } from './src/constants/AppConstant'

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  const pathname = request.nextUrl.pathname

  if (!accessToken && pathname !== LOGIN_ROUTE) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  } else if (pathname === LOGIN_ROUTE && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.rewrite(request.url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
