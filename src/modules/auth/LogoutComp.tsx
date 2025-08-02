import React, { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { LOGIN_ROUTE } from '@/constants/AppConstant'

const LogoutComp = (): JSX.Element => {
  const router = useRouter()

  useEffect(() => {
    const doLogout = async (): Promise<void> => {
      await fetch('/api/logout', { method: 'GET' })
      router.push(LOGIN_ROUTE)
    }

    doLogout()
  }, [])

  return <h3>Please wait....</h3>
}

export default LogoutComp
