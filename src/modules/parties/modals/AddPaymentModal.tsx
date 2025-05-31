import React from 'react'

import { Form, InputNumber, Input, Space } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { FormItemWrapper, ModalWrapper, SelectWrapper } from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { PaymentOptions } from '../static/constants'

const AddPaymentModal = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes): JSX.Element => {
  const [form] = Form.useForm()

  const handleFinish = (): void => {
    afterSubmit?.()
    closeModal()
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper title="Add Payment" open={openModal} onCancel={closeModal} onOk={() => form.submit()} okText="Add Payment">
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <FormItemWrapper label="Payment Date" name="date" rules={requiredFieldRules}>
          <DatePickerWrapper />
        </FormItemWrapper>

        <FormItemWrapper label="Amount" name="amount" rules={requiredFieldRules}>
          <InputNumber min={1} />
        </FormItemWrapper>

        <FormItemWrapper label="Payment Method" name="method" rules={requiredFieldRules}>
          <SelectWrapper options={PaymentOptions} />
        </FormItemWrapper>

        <FormItemWrapper
          label={
            <Space size={8}>
              Notes
              <InfoTooltip title={'Optional note (e.g. paid via UPI)'} />
            </Space>
          }
          name="note"
        >
          <Input.TextArea rows={3} />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default AddPaymentModal
