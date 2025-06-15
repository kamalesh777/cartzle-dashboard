import React, { useLayoutEffect } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

import { LOGIN_ROUTE } from '@/constants/AppConstant'

const LogoutComp = (): JSX.Element => {
  const router = useRouter()

  useLayoutEffect(() => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    router.push(LOGIN_ROUTE)
  }, [])

  return <h3>Please wait....</h3>
}

export default LogoutComp
