import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true })

  response.cookies.set('accessToken', 'hhh', {
    httpOnly: true,
    path: '/',
    expires: new Date(0), // Expire immediately
  })

  response.cookies.set('refreshToken', 'kkk', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  })

  return response
}
