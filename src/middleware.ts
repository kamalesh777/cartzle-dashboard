import { type NextRequest, NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function middleware(request: NextRequest) {
  console.log("===request", request)
  return NextResponse.redirect(new URL('/home', request.url))
}
