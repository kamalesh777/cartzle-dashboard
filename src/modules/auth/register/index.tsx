'use client'
import React, { useState } from 'react'

import { Form, Steps } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import FormWrapper from '@/components/Wrapper/FormWrapper'

import { modalCloseHandler } from '@/utils/commonFunctions'

import Step1Content from './Step1'
import Step2Content from './Step2'
import Step3Content from './Step3'

const RegisterComp = ({ setOpenModal }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const [currentStep, setCurrentStep] = useState<number>(0)

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  const stepsOption = [
    {
      title: 'User info',
      description: <p className="fs-7">Enter user details</p>,
      key: 'step_1',
      content: <Step1Content {...{ setCurrentStep, form, closeModal }} />,
    },
    {
      title: 'Company info',
      description: <p className="fs-7">Enter company details</p>,
      key: 'step_2',
      content: <Step2Content {...{ setCurrentStep, form, closeModal }} />,
    },
    {
      title: 'Ready!',
      description: <p className="fs-7">Almost there!</p>,
      key: 'step_3',
      content: <Step3Content {...{ form, currentStep }} />,
    },
  ]

  return (
    <>
      <Steps current={currentStep} items={stepsOption} className="mb-5" />

      <FormWrapper form={form}>
        {stepsOption?.map((step, index) => (
          <div
            key={step.key}
            className={currentStep === index ? 'opacity-1 height-auto' : 'opacity-0 height-0'}
          >
            {step.content}
          </div>
        ))}
      </FormWrapper>
    </>
  )
}

export default RegisterComp
