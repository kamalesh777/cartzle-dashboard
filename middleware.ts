import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { API_BASE_URL, API_ROUTES } from './src/constants/ApiConstant'
import { AUTH_PATHS, LOGIN_ROUTE } from './src/constants/AppConstant'
import { fetchServerSide } from './src/utils/fetchServerSide'

interface CommonTypes {
  success: boolean
  message: string
  status: number
}
interface NewTokenTypes extends CommonTypes {
  result: {
    accessToken: string
    refreshToken: string
  }
}
interface ValidateTokenResponse extends CommonTypes {
  result: {
    id: string
    name: string
    email: string
    role: string
  } | null
}

// validate the token from the server from the cookies access token
const validateAuthToken = async (): Promise<ValidateTokenResponse> => {
  try {
    const resp = await fetchServerSide(API_ROUTES['validate'])
    return resp
  } catch (error) {
    return { success: false, message: 'Token validation failed', status: 401, result: null }
  }
}

// generate new token through refresh token
const reGenerateToken = async (): Promise<NewTokenTypes | null> => {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
      return null
    }

    const response = await fetch(`${API_BASE_URL}/token/generate-new-token`, {
      headers: {
        'Content-Type': 'application/json',
        'x-refresh-token': refreshToken,
      },
      method: 'GET',
      cache: 'no-store', // Prevent caching
    })

    if (!response.ok) throw new Error('Failed to refresh token')
    const data = await response.json()

    return data
  } catch (error) {
    return null
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static assets and API routes (belt & suspenders with matcher)
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const response = await validateAuthToken()
  let isAuthenticated = response?.success

  // If token is invalid, try to refresh ONCE
  if (!isAuthenticated && (response?.status === 401 || response?.status === 403)) {
    const refreshData = await reGenerateToken()

    if (refreshData?.success && refreshData.result) {
      // Set new cookies and mark as authenticated
      const newResponse = NextResponse.next()
      newResponse.cookies.set('accessToken', refreshData.result.accessToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
      newResponse.cookies.set('refreshToken', refreshData.result.refreshToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })

      isAuthenticated = true

      // If user is on auth page, redirect to home with new cookies
      if (AUTH_PATHS.includes(pathname)) {
        const redirectResponse = NextResponse.redirect(new URL('/', request.url))
        redirectResponse.cookies.set('accessToken', refreshData.result.accessToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
        redirectResponse.cookies.set('refreshToken', refreshData.result.refreshToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
        return redirectResponse
      }

      return newResponse
    }

    // Refresh failed
    isAuthenticated = false
  }

  // Redirect to login if not authenticated and not on auth page
  if (!isAuthenticated && !AUTH_PATHS.includes(pathname)) {
    const loginUrl = new URL(LOGIN_ROUTE, request.url)
    // Prevent redirect loops by adding a query param
    if (!request.nextUrl.searchParams.has('redirected')) {
      loginUrl.searchParams.set('redirected', 'true')
    }
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if authenticated and on auth page
  if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
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
