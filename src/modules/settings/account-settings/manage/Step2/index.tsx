import React from 'react'

import { Form, type FormInstance, Input, Row } from 'antd'

import { lowerCase } from 'lodash'

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
        <ColWrapper>
          <FormItemWrapper label="Name" name={['company', 'name']} rules={requiredWithWhitspcFieldRules}>
            <InputWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper>
          <FormItemWrapper
            label="Subdomain"
            name={['company', 'subdomain']}
            initialValue={domainSuffix}
            rules={requiredWithWhitspcFieldRules}
            normalize={value => lowerCase(value)?.split(' ').join('.')}
            extra={
              company?.subdomain ? (
                <span>
                  Website URL:
                  <i className="ms-2">{`https://${company?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN_NAME}`}</i>
                </span>
              ) : null
            }
          >
            <InputWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>

      <ColWrapper>
        <FormItemWrapper
          name={['company', 'supportNumber']}
          label="Support Number"
          rules={[...requiredFieldRules]}
        >
          <InputNumberWrapper maxLength={10} />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper
          name={['company', 'supportEmail']}
          label="Support Email"
          rules={[...requiredFieldRules]}
        >
          <InputWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper>
        <FormItemWrapper
          name={['company', 'address']}
          label="Company Address"
          rules={[...requiredFieldRules]}
        >
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
