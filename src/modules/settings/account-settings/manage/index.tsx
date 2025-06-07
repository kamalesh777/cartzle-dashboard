'use client'
import React, { useState } from 'react'

import { Steps } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { ModalWrapper } from '@/components/Wrapper'

import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import Step1Content from './Step1'
import Step2Content from './Step2'
import Step3Contengt from './Step3'

const AccountSettingsComp = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<number>(0)

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  const stepsOption = [
    {
      title: 'User info',
      key: 'step_1',
      content: <Step1Content />,
    },
    {
      title: 'Company info',
      key: 'step_2',
      content: <Step2Content />,
    },
    {
      title: 'Ready!',
      key: 'step_3',
      content: <Step3Contengt />,
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
      <Steps current={currentStep} onChange={setCurrentStep} items={stepsOption} />
      <div className="pt-4">{stepsOption[currentStep].content}</div>
    </ModalWrapper>
  )
}

export default AccountSettingsComp
