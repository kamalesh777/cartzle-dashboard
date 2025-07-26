import { cookies } from 'next/headers'

import { API_BASE_URL } from '@/constants/ApiConstant'

export const fetchServerSide = async (endpoint: string): Promise<any> => {
  const Cookies = await cookies()

  // use params if present
  const params = new URLSearchParams()
  if (endpoint.includes('?')) {
    const paramPairs = endpoint.split('?')[1].split('&')

    paramPairs.forEach(pair => {
      const [key, value] = pair.split('=')
      params.set(key, value)
    })
  }

  // check if params are present
  const paramsString = params.toString() ? `?${params.toString()}` : ''

  const response = await fetch(`${API_BASE_URL}${endpoint}${paramsString}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')?.value}`,
    },
  })
  return response.json()
}
