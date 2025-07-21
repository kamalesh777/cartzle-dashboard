import React from 'react'

import { Form, type FormInstance, Input, Row } from 'antd'

import { kebabCase, lowerCase } from 'lodash'

import {
  FormItemWrapper,
  InputWrapper,
  ColWrapper,
  InputNumberWrapper,
  SubmitButtonWrapper,
  ButtonWrapper,
} from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules, COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'

interface PropTypes {
  form?: FormInstance
  setCurrentStep: (param: number) => void
  closeModal: () => void
}

const Step2Content = ({ form, setCurrentStep, closeModal }: PropTypes): JSX.Element => {
  const company = Form.useWatch(['company'], form)
  const { submit, buttonLoading } = usePostRequestHandler()
  const domainSuffix = process.env.NEXT_PUBLIC_DOMAIN_SUFFIX

  const formSubmitHandler = async (): Promise<void> => {
    const formValues = await form?.getFieldsValue()
    await submit('post', '/api/company-create', formValues, null, () => {
      setCurrentStep(2)
    })
  }
  return (
    <>
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={18}>
          <FormItemWrapper
            label="Name"
            name={['company', 'name']}
            rules={requiredWithWhitspcFieldRules}
            normalize={value => kebabCase(value)}
          >
            <InputWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={6}>
          <FormItemWrapper
            label="Suffix"
            name={['company', 'suffixDomain']}
            initialValue={domainSuffix}
            rules={requiredWithWhitspcFieldRules}
            normalize={value => lowerCase(value)}
          >
            <InputWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>

      <FormItemWrapper label="Website">
        <InputWrapper
          value={company?.name}
          prefix="https://"
          readOnly
          suffix={`.${company?.suffixDomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN_NAME}`}
        />
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
