import axios from 'axios'

import { API_BASE_URL } from '@constants/ApiConstant'

const Axios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // headers: {
  //   Authorization: '',
  // },
})

Axios.interceptors.request.use(
  config => {
    // get the auth token from the cookie
    // server : config.headers.Authorization
    // client : JSCookie.get('auth_token')
    // const authToken = config.headers.Authorization || JSCookie.get('auth_token')
    const authToken = ''

    // add the auth token to the request headers if it exists
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`
    }

    return config
  },
  (error: any) => Promise.reject(error),
)
export default Axios
