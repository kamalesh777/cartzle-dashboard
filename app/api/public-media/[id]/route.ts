import type { NextRequest } from 'next/server'

import { API_BASE_URL } from '@/constants/ApiConstant'

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  const { id } = params

  // 1️⃣ Call your backend API to get file details
  const backendResponse = await fetch(`${API_BASE_URL}/media-srv/${id}`)

  if (!backendResponse.ok) {
    return new Response('File not found', { status: 404 })
  }

  const data = await backendResponse.json()

  // 2️⃣ Get the actual image URL
  const urlObj = new URL(data.result.url)
  urlObj.searchParams.set('v', data.result.versionInfo.name)

  // 3️⃣ Fetch the image from the remote source
  const imageResponse = await fetch(urlObj.toString())

  if (!imageResponse.ok) {
    return new Response('Image not found at source', { status: 404 })
  }

  // 4️⃣ Stream the image back to the client
  return new Response(imageResponse.body, {
    headers: {
      'Content-Type': data.result.mime,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
    },
  })
}
