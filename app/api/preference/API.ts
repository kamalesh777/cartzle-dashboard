import axios from 'axios'
import Cookies from 'js-cookie'

import Toast from '@/components/Common/Toast'
import { AUTH_PATHS } from '@/constants/AppConstant'

export const API = axios.create()

interface MyErrorType {
  code?: string
  response?: {
    status: number
    data?: Record<string, string>
    error?: boolean
    message?: string
  }
  config?: {
    url?: string
    [key: string]: any
  }
}

interface NewTokenTypes {
  data: {
    success: boolean
    result: {
      accessToken: string
      refreshToken: string
    }
  }
}

// Function to get current pathname
const getCurrentPathname = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return ''
}

// ✅ Request Interceptor
API.interceptors.request.use(
  async req => {
    const accessToken = Cookies.get('accessToken')
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`
    }

    req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    req.headers.Pragma = 'no-cache'
    req.headers['Content-Type'] = 'application/json'
    req.headers['X-client-host'] = req.headers['X-client-host']
    req.maxContentLength = Infinity
    req.maxBodyLength = Infinity

    return req
  },
  async err => await Promise.reject(err),
)

// ✅ Response Interceptor
API.interceptors.response.use(
  res => res,
  async (err: MyErrorType) => {
    if (typeof window !== 'undefined') {
      const pathname = getCurrentPathname()
      const isAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path))

      const refreshToken = Cookies.get('refreshToken')

      // Skip refresh logic if already failed at /generate-token
      const isGenerateTokenRequest = err?.config?.url?.includes('/api/generate-token')

      if ((err?.response?.status === 401 || err?.response?.status === 403) && !isGenerateTokenRequest) {
        if (!isAuthPath && refreshToken) {
          try {
            const resp: NewTokenTypes = await API.get('/api/generate-token')

            if (resp?.data?.success) {
              const result = resp.data.result || {}
              Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict' })
              Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict' })

              // 🔄 Reload to retry the original request
              window.location.reload()
            } else {
              Toast('error', 'Your session has expired! Please re-login.')
              window.location.replace('/auth/logout')
            }
          } catch (refreshError) {
            Toast('error', 'Unable to refresh session. Please log in again.')
            window.location.replace('/auth/logout')
          }
        } else {
          window.location.replace('/auth/logout')
        }
      }
    }

    return await Promise.reject(err)
  },
)

export default API
