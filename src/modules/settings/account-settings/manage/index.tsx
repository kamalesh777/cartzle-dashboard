'use client'
import React, { useState } from 'react'

import { Form, Steps } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { ModalWrapper } from '@/components/Wrapper'

import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import Step1Content from './Step1'
import Step2Content from './Step2'
import Step3Content from './Step3'

const AccountSettingsComp = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const [currentStep, setCurrentStep] = useState<number>(0)

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  const stepsOption = [
    {
      title: 'User info',
      key: 'step_1',
      content: <Step1Content {...{ setCurrentStep, form, closeModal }} />,
    },
    {
      title: 'Company info',
      key: 'step_2',
      content: <Step2Content {...{ setCurrentStep, form, closeModal }} />,
    },
    {
      title: 'Ready!',
      key: 'step_3',
      content: <Step3Content {...{ form, currentStep }} />,
    },
  ]

  return (
    <ModalWrapper
      // bodyScroll
      width={580}
      title={`${getModalTitle(selectedId as string)}`}
      open={openModal}
      onCancel={closeModal}
      footer={null}
    >
      <Steps current={currentStep} items={stepsOption} />
      <div className="pt-4">
        <Form form={form} layout="vertical">
          {stepsOption?.map((step, index) => (
            <div
              key={step.key}
              className={currentStep === index ? 'opacity-1 height-auto' : 'opacity-0 height-0'}
            >
              {step.content}
            </div>
          ))}
        </Form>
      </div>
    </ModalWrapper>
  )
}

export default AccountSettingsComp
