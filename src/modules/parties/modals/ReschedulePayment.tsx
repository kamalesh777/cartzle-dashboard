import React from 'react'

import { Form, Input } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { ModalWrapper, SubmitButtonWrapper, FormItemWrapper, InputNumberWrapper, SpaceWrapper } from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'
import { getDisabledDate } from '@/utils/disableFunction'

const ReschedulePayment = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const handleFinish = (): void => {
    afterSubmit?.()
    closeModal()
  }
  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      title="Reschedule Payment"
      open={openModal}
      onCancel={closeModal}
      footer={
        <SubmitButtonWrapper
          okText="Reschedule"
          okButtonProps={{ loading: false, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <FormItemWrapper label="Promised Date" name="promised_date" rules={requiredFieldRules}>
          <DatePickerWrapper
            showNow={false}
            disabledDate={getDisabledDate('before', 0)}
            // showTime={{ showSecond: false, showMinute: false, use12Hours: true }}
          />
        </FormItemWrapper>
        <FormItemWrapper label="Promised Amount" name="promised_amount" rules={requiredFieldRules}>
          <InputNumberWrapper min={1} />
        </FormItemWrapper>
        <FormItemWrapper
          label={
            <SpaceWrapper size={8}>
              Notes
              <InfoTooltip title={'Optional note (e.g. paid via UPI)'} />
            </SpaceWrapper>
          }
          name="note"
        >
          <Input.TextArea rows={3} />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default ReschedulePayment
