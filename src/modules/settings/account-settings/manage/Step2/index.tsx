import React from 'react'

import { Form, Input } from 'antd'

import {
  FormItemWrapper,
  InputWrapper,
  ColWrapper,
  InputNumberWrapper,
  SubmitButtonWrapper,
  ButtonWrapper,
} from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules } from '@/constants/AppConstant'

interface FormValues {
  name: string
  number: string
  email: string
  address: string
}

const Step2Content = (): JSX.Element => {
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
        <FormItemWrapper name="support_number" label="Support Number" rules={[...requiredFieldRules]}>
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name="email" label="Support Email">
          <InputWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper md={24}>
        <FormItemWrapper name="address" label="Company Address" rules={[...requiredFieldRules]}>
          <Input.TextArea rows={3} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <div className="w-100 d-flex justify-content-between">
          <ButtonWrapper>Back</ButtonWrapper>
          <SubmitButtonWrapper okText="Save" okButtonProps={{ loading: false }} />
        </div>
      </ColWrapper>
    </Form>
  )
}

export default Step2Content
