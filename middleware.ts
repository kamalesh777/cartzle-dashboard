/* eslint-disable no-console */
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

const validateAuthToken = async (): Promise<ValidateTokenResponse> => {
  try {
    const resp = await fetchServerSide(API_ROUTES['validate'])
    if (!resp || typeof resp !== 'object') {
      throw new Error('Invalid response from validation endpoint')
    }
    return resp as ValidateTokenResponse
  } catch (error) {
    console.error('[Middleware] Token validation error:', error)
    return { success: false, message: 'Token validation failed', status: 401, result: null }
  }
}

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
      cache: 'no-store',
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data as NewTokenTypes
  } catch (error) {
    console.error('[Middleware] Token refresh error:', error)
    return null
  }
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
  try {
    const pathname = request.nextUrl.pathname

    // Skip for static files
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
      return NextResponse.next()
    }

    let isAuthenticated = false

    // Validate token
    const validationResponse = await validateAuthToken()
    isAuthenticated = validationResponse?.success === true

    // Try refresh if validation failed
    if (!isAuthenticated && (validationResponse?.status === 401 || validationResponse?.status === 403)) {
      const refreshData = await reGenerateToken()

      if (refreshData?.success && refreshData.result) {
        isAuthenticated = true

        const response = AUTH_PATHS.includes(pathname)
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next()

        response.cookies.set('accessToken', refreshData.result.accessToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })
        response.cookies.set('refreshToken', refreshData.result.refreshToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
        })

        return response
      }
    }

    // Handle redirects
    if (!isAuthenticated && !AUTH_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }

    if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('==[Middleware] Critical error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
