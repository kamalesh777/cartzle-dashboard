'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getRequest, postRequest, putRequest } from '@/api/preference/RequestService'
import Toast from '@/components/common/Toast'

type RequestMethod = string | undefined | 'post' | 'put'
type Callback = () => void

interface PostRequestHandlerReturn<T, P> {
  data: T | null
  isSuccess: boolean
  buttonLoading: boolean
  submit: (method: RequestMethod, endPoint: string, payload?: P, goBack?: string | null, callBack?: Callback) => Promise<T | null>
}

/**
 * Custom hook for handling POST or PUT requests with optional toast messages and navigation.
 *
 * @param method The HTTP method to use ('post' or 'put'). Default is 'post'.
 * @param successToast Whether to show a success toast. Default is true.
 * @param failToast Whether to show a failure toast. Default is true.
 * @returns An object containing `data`, `isSuccess`, `buttonLoading`, `method`, and the `submit` function.
 */
export const usePostRequestHandler = <T = unknown, P = unknown>(
  successToast = true,
  failToast = true,
): PostRequestHandlerReturn<T, P> => {
  const router = useRouter()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const submit = async (
    method: RequestMethod,
    endPoint: string,
    payload?: P,
    goBack?: string | null,
    callBack?: Callback
  ): Promise<T | null> => {
    if (buttonLoading) return null

    setButtonLoading(true)
    let response: T | null = null

    try {
      const res = (!method || method === 'post')
        ? await postRequest(endPoint, payload || {})
        : await putRequest(endPoint, payload || {})

      if (res.data.success) {
        setData(res.data as T)
        setIsSuccess(true)

        if (successToast) Toast('success', res.data.message || 'Request successful')
        if (goBack) router.push(goBack)
        if (callBack) callBack()

        response = res.data as T
      } else {
        setData(res.data as T)
        setIsSuccess(false)
        const message = typeof res.data.message === 'string'
          ? res.data.message
          : 'An error occurred'

        response = res.data as T

        if (failToast) Toast('error', message)
      }
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setButtonLoading(false)
    }

    return response
  }

  return {
    data,
    isSuccess,
    buttonLoading,
    submit,
  }
}


interface GetRequestHandlerReturn<T> {
  data: T | null
  isSuccess: boolean
  isLoading: boolean
  fetchData: (endPoint: string) => Promise<void>
}

/**
 * Custom hook for handling GET requests with optional toast messages.
 *
 * @param successToast Whether to show a success toast. Default is false.
 * @param failToast Whether to show a failure toast. Default is true.
 * @returns An object containing `data`, `isSuccess`, `isLoading`, and the `fetchData` function.
 */
export const useGetRequestHandler = <T = unknown>(successToast = false, failToast = true): GetRequestHandlerReturn<T> => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [data, setData] = useState<T | null>(null)

  const fetchData = async (endPoint: string): Promise<void> => {
    setIsLoading(true)
    try {
      const res = await getRequest(endPoint, {})
      if (res.data.success) {
        setData(res.data.result as T)
        setIsSuccess(true)
        if (successToast) Toast('success', res.data.message || 'Request successful')
      } else {
        setData(null)
        const message = res?.data?.message?.length > 0 ? res.data.message : 'Something went wrong'
        if (failToast) Toast('error', message)
      }
    } catch (err) {
      Toast('error', (err as Error).message)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data,
    isSuccess,
    isLoading,
    fetchData,
  }
}
