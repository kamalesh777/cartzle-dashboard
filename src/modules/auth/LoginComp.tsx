import React from 'react'

import { Form, Input, Checkbox, Row } from 'antd'
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'

import type { DataResponse } from 'src/types/common'

import { ButtonWrapper, CardWrapper, ColWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import { usePostRequestHandler } from '@/hook/requestHandler'

interface FormValueTypes {
  email: string
  password: string
}

interface ResultTypes {
  accessToken: string
  refreshToken: string
}

const LoginComp = (): JSX.Element => {
  const router = useRouter()
  const { submit, buttonLoading } = usePostRequestHandler<DataResponse<ResultTypes>, FormValueTypes>('post', false)

  const formSubmitHandler = async (formValues: FormValueTypes): Promise<void> => {
    const resp = await submit('/api/login', formValues, null)

    if (resp?.success) {
      router.push('/') // go to home page
      Cookies.set('accessToken', resp.result.accessToken, { secure: true, sameSite: 'Strict' })
      Cookies.set('refreshToken', resp.result.refreshToken, { secure: true, sameSite: 'Strict' })
    }
  }

  return (
    <div className="login-bg auth-container">
      <Row justify="center" align="middle" className="h-100">
        <ColWrapper md={6}>
          <CardWrapper>
            <h2 className="mb-3">Login Now!</h2>
            <Form layout="vertical" onFinish={formSubmitHandler}>
              <FormItemWrapper label="Username" name="email" rules={[{ required: true, message: 'Please input your username!' }]}>
                <InputWrapper />
              </FormItemWrapper>

              <FormItemWrapper
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </FormItemWrapper>

              <FormItemWrapper name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </FormItemWrapper>
              <FormItemWrapper label={null}>
                <ButtonWrapper type="primary" htmlType="submit" loading={buttonLoading}>
                  Submit
                </ButtonWrapper>
              </FormItemWrapper>
            </Form>
          </CardWrapper>
        </ColWrapper>
      </Row>
    </div>
  )
}

export default LoginComp
