import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { API_BASE_URL } from '@/constants/ApiConstant'
import { LOGIN_ROUTE } from '@/constants/AppConstant'

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const Cookies = await cookies()

  const resp = await fetch(`${API_BASE_URL}/token/generate-new-token`, {
    headers: {
      'Content-Type': 'application/json',
      'x-refresh-token': Cookies.get('refreshToken')?.value || '',
    },
    method: 'GET',
  })
  const data = await resp.json()

  if (!data?.success) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url))
  }
  console.log('===data response', data)
  const response = NextResponse.redirect(new URL(callbackUrl, request.url))

  response.cookies.set('accessToken', data.accessToken)

  response.cookies.set('refreshToken', data.refreshToken)

  return response
}
