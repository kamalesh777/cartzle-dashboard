import React, { useEffect } from 'react'

import { Form, Input, Checkbox, Button, Row } from 'antd'

import { getRequest } from '@/api/preference/RequestService'
import { CardWrapper, ColWrapper, FormItemWrapper } from '@/components/Wrapper'

const LoginComp = (): JSX.Element => {
  useEffect(() => {
    apiTesting()
  }, [])

  const apiTesting = async (): Promise<void> => {
    const resp = await getRequest('/api/api-testing')

    // eslint-disable-next-line no-console
    console.log('==resp', resp)
  }

  return (
    <div className="login-bg auth-container">
      <Row justify="center" align="middle" className="h-100">
        <ColWrapper md={6}>
          <CardWrapper>
            <h2 className="mb-3">Login Now!</h2>
            <Form layout="vertical">
              <FormItemWrapper
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItemWrapper>
            </Form>
          </CardWrapper>
        </ColWrapper>
      </Row>
    </div>
  )
}

export default LoginComp
