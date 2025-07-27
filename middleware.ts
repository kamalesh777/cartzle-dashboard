import { type NextRequest, NextResponse } from 'next/server'

import { LOGIN_ROUTE } from './src/constants/AppConstant'
import { fetchServerSide } from './src/utils/fetchServerSide'

interface ValidateTokenResponse {
  success: boolean
  message: string
  result: {
    id: string
    name: string
    email: string
    role: string
  } | null
}

const validateAuthToken = async (): Promise<ValidateTokenResponse> => {
  const resp = await fetchServerSide('/user/validate-token')
  return resp
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = await validateAuthToken()
  const isSuccess = response?.success

  const pathname = request.nextUrl.pathname

  // If the token is invalid and the user is not on the login page, redirect to the login page
  if (!isSuccess && pathname !== LOGIN_ROUTE) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  } else if (pathname === LOGIN_ROUTE && isSuccess) {
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
