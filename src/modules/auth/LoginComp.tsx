import React from 'react'

import { Form, Input, Checkbox, Row } from 'antd'

import { ButtonWrapper, CardWrapper, ColWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import { usePostRequestHandler } from '@/hook/requestHandler'

interface FormValueTypes {
  email: string
  password: string
}

const LoginComp = (): JSX.Element => {
  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (formValues: FormValueTypes): Promise<void> => {
    await submit('/api/login', formValues)
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
