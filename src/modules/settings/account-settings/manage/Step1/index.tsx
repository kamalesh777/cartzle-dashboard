import React from 'react'

import { Form, Input } from 'antd'

import { FormItemWrapper, InputWrapper, ColWrapper, InputNumberWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules } from '@/constants/AppConstant'

interface FormValues {
  name: string
  mobile: string
  email: string
  password: string
}

const Step1Content = (): JSX.Element => {
  const [form] = Form.useForm()

  const formSubmitHandler = async (formValues: FormValues): Promise<void> => {
    // eslint-disable-next-line no-console
    console.log('==values', formValues)
  }
  return (
    <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
      <FormItemWrapper name="name" label="Name" rules={requiredWithWhitspcFieldRules}>
        <InputWrapper />
      </FormItemWrapper>
      <ColWrapper>
        <FormItemWrapper name="mobile" label="Mobile" rules={[...requiredFieldRules]}>
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name="email" label="Email">
          <InputWrapper type="email" />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name="password" label="Password" rules={requiredWithWhitspcFieldRules}>
          <Input.Password />
        </FormItemWrapper>
      </ColWrapper>
      <SubmitButtonWrapper okText="Next" okButtonProps={{ loading: false }} spaceClassName="justify-content-end w-100" />
    </Form>
  )
}

export default Step1Content
