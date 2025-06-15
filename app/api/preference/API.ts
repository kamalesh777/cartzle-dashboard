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
}

interface NewTokenTypes {
  data: {
    success: boolean
    result: { accessToken: string; refreshToken: string }
  }
}

// Function to get current pathname
const getCurrentPathname = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }
  return ''
}

API.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/require-await
  async req => {
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

// API response interceptor
API.interceptors.response.use(
  res => {
    return res
  },
  async (err: MyErrorType) => {
    if (typeof window !== 'undefined') {
      // Get fresh pathname value
      const pathname = getCurrentPathname()
      const isAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path))

      if ((err?.response?.status === 401 || err?.response?.status === 403) && !isAuthPath) {
        const resp: NewTokenTypes = await API.get('/api/generate-token')

        if (resp?.data?.success) {
          const result = resp.data.result || {}
          Cookies.set('accessToken', result.accessToken, { secure: true, sameSite: 'Strict' })
          Cookies.set('refreshToken', result.refreshToken, { secure: true, sameSite: 'Strict' })
          window.location.reload()
        } else {
          Toast('error', 'Your session has expired! Please Re-login.')
          window.location.replace('/auth/login')
        }
      }
    }
    return await Promise.reject(err)
  },
)

export default API
