import React from 'react'

import { Input } from 'antd'

import { FormItemWrapper, InputWrapper, ColWrapper, InputNumberWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules } from '@/constants/AppConstant'

const Step1Content = (): JSX.Element => {
  return (
    <>
      <FormItemWrapper name={['user', 'name']} label="Name" rules={requiredWithWhitspcFieldRules}>
        <InputWrapper />
      </FormItemWrapper>
      <ColWrapper>
        <FormItemWrapper name={['user', 'mobile']} label="Mobile" rules={[...requiredFieldRules]}>
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name={['user', 'email']} label="Email">
          <InputWrapper type="email" />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name={['user', 'password']} label="Password" rules={requiredWithWhitspcFieldRules}>
          <Input.Password />
        </FormItemWrapper>
      </ColWrapper>
      <SubmitButtonWrapper
        okText="Next"
        okButtonProps={{ loading: false, htmlType: 'button' }}
        spaceClassName="justify-content-end w-100"
      />
    </>
  )
}

export default Step1Content
