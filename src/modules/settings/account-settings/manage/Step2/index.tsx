import React from 'react'

import { type FormInstance, Input } from 'antd'

import {
  FormItemWrapper,
  InputWrapper,
  ColWrapper,
  InputNumberWrapper,
  SubmitButtonWrapper,
  ButtonWrapper,
} from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'

interface PropTypes {
  form?: FormInstance
  setCurrentStep: (param: number) => void
}

const Step2Content = ({ form, setCurrentStep }: PropTypes): JSX.Element => {
  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (): Promise<void> => {
    const formValues = await form?.getFieldsValue()
    await submit('/api/create-company', formValues, null, () => {
      setCurrentStep(2)
    })
  }
  return (
    <>
      <FormItemWrapper name={['company', 'name']} label="Name" rules={requiredWithWhitspcFieldRules}>
        <InputWrapper />
      </FormItemWrapper>
      <ColWrapper>
        <FormItemWrapper name={['company', 'support_number']} label="Support Number" rules={[...requiredFieldRules]}>
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name={['company', 'support_email']} label="Support Email">
          <InputWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper md={24}>
        <FormItemWrapper name={['company', 'address']} label="Company Address" rules={[...requiredFieldRules]}>
          <Input.TextArea rows={3} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <div className="w-100 d-flex justify-content-between">
          <ButtonWrapper onClick={() => setCurrentStep(1)}>Back</ButtonWrapper>
          <SubmitButtonWrapper okText="Save" okButtonProps={{ loading: buttonLoading, onClick: formSubmitHandler }} />
        </div>
      </ColWrapper>
    </>
  )
}

export default Step2Content
