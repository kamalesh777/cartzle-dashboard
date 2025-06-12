'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import LoginComp from './LoginComp'
import LogoutComp from './LogoutComp'

const AuthComp = (): JSX.Element => {
  const params = useParams()

  const renderAuthPage = (path: string): JSX.Element => {
    switch (path) {
      case 'login':
        return <LoginComp />
      case 'logout':
        return <LogoutComp />
      default:
        return <></>
    }
  }
  return renderAuthPage(params.page as string)
}

export default AuthComp
