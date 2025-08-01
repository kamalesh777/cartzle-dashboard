import axios from 'axios'
import Cookies from 'js-cookie'

import Toast from '@/components/Common/Toast'

export const API = axios.create()

let failureCount = 0
const MAX_FAILURES = 10
// eslint-disable-next-line @typescript-eslint/no-unused-vars, autofix/no-unused-vars
let blockAllRequests = false

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

// ✅ Request Interceptor
API.interceptors.request.use(
  async req => {
    // const accessToken = Cookies.get('accessToken')
    // if (accessToken) {
    //   req.headers.Authorization = `Bearer ${accessToken}`
    // }

    req.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    req.headers.Pragma = 'no-cache'
    req.headers['Content-Type'] = 'application/json'
    // get the hostname from the cookie for debug purpose
    // req.headers['X-Client-Host'] = req.headers['X-Client-Host']
    // req.headers['X-Refresh-Token'] = req.headers['X-Refresh-Token']
    req.maxContentLength = Infinity
    req.maxBodyLength = Infinity

    return req
  },
  async err => await Promise.reject(err),
)

// ✅ Response Interceptor
API.interceptors.response.use(
  res => {
    // On success, reset failure count
    failureCount = 0
    return res
  },
  async (err: MyErrorType) => {
    failureCount++
    if (failureCount >= MAX_FAILURES) {
      blockAllRequests = true
      Toast('error', `API blocked after ${failureCount} failures.`)
    }
    if (typeof window !== 'undefined') {
      // Skip refresh logic if already failed at /generate-token
      const isGenerateTokenRequest = err?.config?.url?.includes('/api/generate-token')

      if ((err?.response?.status === 401 || err?.response?.status === 403) && !isGenerateTokenRequest) {
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
          }
        } catch (refreshError) {
          return await Promise.reject(err)
        }
      } else {
        // window.location.replace(LOGOUT_ROUTE)
        return await Promise.reject(err)
      }
    }

    return await Promise.reject(err)
  },
)

export default API
