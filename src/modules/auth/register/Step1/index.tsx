import React from 'react'

import { type FormInstance, Input } from 'antd'

import { MoveRight } from 'lucide-react'

import { usePathname } from 'next/navigation'

import {
  FormItemWrapper,
  InputWrapper,
  ColWrapper,
  InputNumberWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules, requiredFieldRules } from '@/constants/AppConstant'

interface PropTypes {
  form?: FormInstance
  setCurrentStep: (param: number) => void
  closeModal?: () => void
}

const Step1Content = ({ form, setCurrentStep, closeModal }: PropTypes): JSX.Element => {
  const pathName = usePathname()
  const formHandler = (): void => {
    form
      ?.validateFields([
        ['user', 'name'],
        ['user', 'password'],
        ['user', 'mobile'],
      ])
      .then(() => {
        setCurrentStep(1)
      })
      .catch(() => setCurrentStep(0))
  }
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
        <FormItemWrapper name={['user', 'email']} label="Email" rules={[...requiredFieldRules]}>
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
        okButtonProps={{
          loading: false,
          htmlType: 'button',
          onClick: () => formHandler(),
          icon: <MoveRight />,
          iconPosition: 'end',
        }}
        cancelText={pathName === '/auth/register-company' ? null : 'Cancel'}
        cancelButtonProps={{ onClick: () => closeModal?.() }}
        spaceClassName="justify-content-end w-100"
      />
    </>
  )
}

export default Step1Content
