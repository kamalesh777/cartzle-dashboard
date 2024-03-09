import API from '@api/preference/API'
import { type reqType, type resType } from '@utils/allTypes'
import queryString from 'query-string'

export const proxyApiHelper = async (req: reqType, res: resType, url: string, appSlug: string, baseVersion = 'v1'): Promise<void> => {
  try {
    // eslint-disable-next-line no-extra-boolean-cast, @typescript-eslint/strict-boolean-expressions
    const reqUrl = `${url}${!!req.query ? `?${queryString.stringify(req.query)}` : ''}`
    const API_URL = 'dummy-api-endpoin'
    const response = await API(API_URL)
    // console.log('ORIGINAL_URL==', API_URL)
    // console.log('QUERY==', req.query)
    res.status(response?.status ?? 403).json(response?.data ?? { message: 'Something went wrong! Try again later.' })
  } catch (error) {
    // console.error('An error occurred:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const apiConfig = {
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: '64mb'
    }
  }
}