import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { API_BASE_URL } from '@/constants/ApiConstant'
import { LOGIN_ROUTE } from '@/constants/AppConstant'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const isApiRequest = request.headers.get('x-api-request') === 'true'

  const Cookies = cookies()
  const refreshToken = Cookies.get('refreshToken')?.value

  if (!refreshToken) {
    if (isApiRequest) {
      return NextResponse.json({ success: false, message: 'No refresh token provided' }, { status: 401 })
    }
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }

  try {
    const resp = await fetch(`${API_BASE_URL}/token/generate-new-token`, {
      headers: {
        'Content-Type': 'application/json',
        'x-refresh-token': refreshToken,
      },
      method: 'GET',
    })

    const data = await resp.json()

    if (!data?.success) {
      if (isApiRequest) {
        return NextResponse.json({ success: false, message: 'Failed to refresh token' }, { status: 401 })
      }
      return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
    }

    // For API requests, return JSON response
    if (isApiRequest) {
      const response = NextResponse.json({
        success: true,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })

      // Set cookies for subsequent requests
      response.cookies.set('accessToken', data.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })
      response.cookies.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      })

      return response
    }

    // For regular page requests, redirect
    const response = NextResponse.redirect(new URL(callbackUrl, request.url))
    response.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
    response.cookies.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    if (isApiRequest) {
      return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
    }
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }
}
