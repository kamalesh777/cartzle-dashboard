import React from 'react'

import { type FormInstance, Input, Space } from 'antd'

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
  closeModal: () => void
}

const Step2Content = ({ form, setCurrentStep, closeModal }: PropTypes): JSX.Element => {
  const { submit, buttonLoading } = usePostRequestHandler()
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN_SUFFIX
  const domainName = process.env.NEXT_PUBLIC_ROOT_DOMAIN_NAME

  const formSubmitHandler = async (): Promise<void> => {
    const formValues = await form?.getFieldsValue()
    await submit('/api/create-company', formValues, null, () => {
      setCurrentStep(2)
    })
  }
  return (
    <>
      <FormItemWrapper label="Name" noStyle>
        <Space.Compact block>
          <FormItemWrapper className="w-75" name={['company', 'name']} rules={requiredWithWhitspcFieldRules}>
            <InputWrapper />
          </FormItemWrapper>
          <FormItemWrapper
            name={['company', 'suffixDomain']}
            initialValue={domainSuffix}
            label=""
            rules={requiredWithWhitspcFieldRules}
          >
            <InputWrapper addonAfter={domainName} readOnly />
          </FormItemWrapper>
        </Space.Compact>
      </FormItemWrapper>
      <ColWrapper>
        <FormItemWrapper name={['company', 'supportNumber']} label="Support Number" rules={[...requiredFieldRules]}>
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper name={['company', 'supportEmail']} label="Support Email" rules={[...requiredFieldRules]}>
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
          <ButtonWrapper onClick={() => setCurrentStep(0)}>Back</ButtonWrapper>
          <SubmitButtonWrapper
            okText="Save"
            okButtonProps={{ loading: buttonLoading, onClick: formSubmitHandler }}
            cancelButtonProps={{ onClick: () => closeModal() }}
          />
        </div>
      </ColWrapper>
    </>
  )
}

export default Step2Content
