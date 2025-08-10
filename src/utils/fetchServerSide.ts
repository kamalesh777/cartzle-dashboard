/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'

type Methods = 'get' | 'post' | 'put' | 'delete'

export const requestServerSide = async (
  endpoint: string,
  method: Methods = 'get',
  body?: any,
): Promise<any> => {
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

  // const response = await fetch(`${API_BASE_URL}${endpoint}${paramsString}`, {
  const response = await fetch(`${endpoint}${paramsString}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('accessToken')?.value}`,
    },
    method,
    body,
  })

  // convert response to json
  const finalResponse = {
    ...(await response.json()),
    status: response.status,
  }
  return finalResponse
}

export const fetchServerSide = requestServerSide
