/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 *
 * @param endpoint - API endpoint | API_ROUTES
 * @param method - HTTP method
 * @param body - Request body
 * @param token - Optional token override
 * @returns
 */

export const requestServerSide = async (
  endpoint: string,
  method: Methods = 'GET',
  body?: any,
  token?: string,
): Promise<any> => {
  try {
    const Cookies = await cookies()
    // Parse existing query params from endpoint
    const [baseEndpoint, queryString] = endpoint.split('?')
    const searchQuery = new URLSearchParams(queryString || '')

    // Build final URL with params
    const paramsString = searchQuery.toString() ? `?${searchQuery.toString()}` : ''
    const accessToken = token || Cookies.get('accessToken')?.value

    if (!accessToken) {
      return {
        status: 401,
        success: false,
        ok: false,
        message: 'No token provided',
        result: null,
      }
    }

    const response = await fetch(`${baseEndpoint}${paramsString}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      method: method.toUpperCase(),
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })

    const data = await response.json()

    return {
      ...data,
      status: response.status,
      ok: response.ok,
    }
  } catch (error) {
    return {
      status: 500,
      success: false,
      ok: false,
      message: (error as Error)?.message || 'Something went wrong',
      result: null,
    }
  }
}

// ✅ FIXED: Just assign the function, don't use await
export const fetchServerSide = requestServerSide
