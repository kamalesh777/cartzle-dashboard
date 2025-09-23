import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { API_BASE_URL, API_ROUTES } from './src/constants/ApiConstant'
import { LOGIN_ROUTE } from './src/constants/AppConstant'
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
    // Token validation error
    return { success: false, message: 'Token validation failed', status: 401, result: null }
  }
}

// generate new token through refresh token
const reGenerateToken = async (): Promise<NewTokenTypes | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/token/generate-new-token`, {
      headers: {
        'Content-Type': 'application/json',
        // get the refresh token from the cookies and send it to the server by x-refresh-token header
        'x-refresh-token': (await cookies()).get('refreshToken')?.value || '',
      },
      method: 'GET',
    })

    if (!response.ok) throw new Error('Failed to refresh token')
    const data = await response.json()

    return data
  } catch (error) {
    // Token refresh failed
    return null
  }
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const pathname = request.nextUrl.pathname

  const response = await validateAuthToken()
  let isSuccess = response?.success

  // If token is invalid, try to refresh
  if ((response?.status === 401 || response?.status === 403) && pathname !== '/api/generate-token') {
    const data = await reGenerateToken()
    if (data?.success) {
      // Build the response with new cookies
      const newResponse = NextResponse.next()
      newResponse.cookies.set('accessToken', data.result?.accessToken || '', {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
      })
      newResponse.cookies.set('refreshToken', data.result?.refreshToken || '', {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
      })
      isSuccess = data?.success

      return newResponse // ✅ Return the same response that has the new cookies
      // eslint-disable-next-line no-else-return
    } else {
      isSuccess = data?.success || false
    }
  }

  // If token is invalid after refresh attempt
  if (!isSuccess && pathname !== LOGIN_ROUTE) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }

  // If already logged in but on login page, redirect to home
  if (isSuccess && pathname === LOGIN_ROUTE) {
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
