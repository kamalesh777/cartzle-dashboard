'use client'

import React from 'react'

import { Col, Row } from 'antd'
import { useParams } from 'next/navigation'

import { CardWrapper } from '@/components/Wrapper'

import LoginComp from './LoginComp'
import LogoutComp from './LogoutComp'
import RegisterComp from './register'

const AuthComp = (): JSX.Element => {
  const params = useParams()
  const REGISTER_COMPANY = 'register-company'

  const renderAuthPage = (path: string): JSX.Element => {
    switch (path) {
      case 'login':
        return <LoginComp />
      case 'logout':
        return <LogoutComp />
      case REGISTER_COMPANY:
        return <RegisterComp openModal={false} setOpenModal={() => null} />
      default:
        return <></>
    }
  }
  return (
    <div className="vh-100">
      <div className="bg-main" />
      <div className="bg-main bg-transition-2" />
      <div className="bg-main bg-transition-3" />
      <Row className="align-items-center justify-content-center h-100">
        <Col md={params.page === REGISTER_COMPANY ? 12 : 8}>
          <CardWrapper className="register-form p-4">{renderAuthPage(params.page as string)}</CardWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default AuthComp
