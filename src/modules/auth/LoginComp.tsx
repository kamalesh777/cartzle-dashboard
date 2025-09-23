import React from 'react'

import { Input, Checkbox, Alert } from 'antd'
import Cookies from 'js-cookie'

import { MoveRight } from 'lucide-react'

import type { DataResponse } from 'src/types/common'

import { ButtonWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
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
  const { submit, buttonLoading, isSuccess, data } = usePostRequestHandler<
    DataResponse<ResultTypes>,
    FormValueTypes
  >(false, false)

  const formSubmitHandler = async (formValues: FormValueTypes): Promise<void> => {
    const resp = await submit('post', '/api/login', formValues, null)

    if (resp?.success) {
      // Set cookies with proper attributes
      Cookies.set('accessToken', resp.result.accessToken, {
        secure: true,
        sameSite: 'Strict',
        path: '/',
        expires: 1, // 1 day
      })
      Cookies.set('refreshToken', resp.result.refreshToken, {
        secure: true,
        sameSite: 'Strict',
        path: '/',
        expires: 7, // 7 days
      })

      // Force a full page reload to ensure all data is properly loaded
      window.location.href = '/'
    }
  }

  return (
    <div className="login-form">
      <h2 className="mb-3">Login Now!</h2>

      <FormWrapper onFinish={formSubmitHandler}>
        {!isSuccess && data?.message ? (
          <Alert message={data?.message} type="error" showIcon className="my-3" />
        ) : null}

        <FormItemWrapper
          label="Email / Mobile"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
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
          <ButtonWrapper
            type="primary"
            htmlType="submit"
            loading={buttonLoading}
            icon={<MoveRight />}
            iconPosition="end"
          >
            Login
          </ButtonWrapper>
        </FormItemWrapper>
      </FormWrapper>
    </div>
  )
}

export default LoginComp
