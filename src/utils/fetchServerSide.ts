/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'

type Methods = 'get' | 'post' | 'put' | 'delete'

/**
 *
 * @param endpoint - API endpoint | API_ROUTES
 * @param method - HTTP method
 * @param body - Request body
 * @returns
 */

export const requestServerSide = async (
  endpoint: string,
  method: Methods = 'get',
  body?: any,
  token?: string,
): Promise<any> => {
  try {
    const Cookies = await cookies()
    // use params if present
    const searchQuery = new URLSearchParams()
    if (endpoint.includes('?')) {
      const paramPairs = endpoint.split('?')[1].split('&')
      paramPairs.forEach(pair => {
        const [key, value] = pair.split('=')
        searchQuery.set(key, value)
      })
    }

    // check if searchQuery are present
    const paramsString = searchQuery.toString() ? `?${searchQuery.toString()}` : ''
    const accessToken = token || Cookies.get('accessToken')?.value

    if (!accessToken) {
      return {
        status: 401,
        ok: false,
        error: 'No token provided',
      }
    }

    const response = await fetch(`${endpoint}${paramsString}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken || ''}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })

    const data = await response.json()
    return {
      ...data,
      status: response.status,
      ok: response.ok,
    }
  } catch (error: any) {
    return {
      status: 500,
      ok: false,
      error: error?.message || 'Something went wrong',
    }
  }
}

export const fetchServerSide = await requestServerSide
