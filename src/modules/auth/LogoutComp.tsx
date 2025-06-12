import React, { useLayoutEffect } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const LogoutComp = (): JSX.Element => {
  const router = useRouter()

  useLayoutEffect(() => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    router.push('/auth')
  }, [])

  return <h3>Please wait....</h3>
}

export default LogoutComp
