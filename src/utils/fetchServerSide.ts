import { cookies } from 'next/headers'

import { API_BASE_URL } from '@/constants/ApiConstant'

export const requestServerSide = async (endpoint: string, method: string, body?: any): Promise<any> => {
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

  const response = await fetch(`${API_BASE_URL}${endpoint}${paramsString}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')?.value}`,
    },
    method,
    body,
  })
  return response.json()
}

export const fetchServerSide = requestServerSide
