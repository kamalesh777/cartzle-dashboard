import React from 'react'

import { Form, Input, Radio, Space, type RadioChangeEvent } from 'antd'

import dayjs from 'dayjs'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import { FormItemWrapper, InputNumberWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { PaymentOptions } from '../static/constants'

const MISSED_CONST = 'missed'

const AddPaymentModal = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes): JSX.Element => {
  const [form] = Form.useForm()
  const isMissedPayment = Form.useWatch('status', form) === MISSED_CONST

  const handleFinish = (): void => {
    afterSubmit?.()
    closeModal()
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)
  const currentTime = dayjs() // current time

  return (
    <ModalWrapper
      title="Add Payment"
      open={openModal}
      onCancel={closeModal}
      footer={
        <SubmitButtonWrapper
          okText="Add Payment"
          okButtonProps={{ loading: false, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <FormItemWrapper name="status" initialValue={MISSED_CONST}>
          <Radio.Group onChange={(e: RadioChangeEvent) => form.setFieldValue('status', e.target.value)}>
            <Radio value={MISSED_CONST}>Missed</Radio>
            <Radio value="paid">Paid</Radio>
          </Radio.Group>
        </FormItemWrapper>
        {/* if user failed to pay then schedule a next date */}
        {isMissedPayment ? (
          <>
            <FormItemWrapper label="Promised Date" name="promised_date" rules={requiredFieldRules}>
              <DatePickerWrapper showTime={{ showSecond: false, showMinute: false, use12Hours: true }} />
            </FormItemWrapper>
            <FormItemWrapper label="Promised Amount" name="promised_amount" rules={requiredFieldRules}>
              <InputNumberWrapper min={1} />
            </FormItemWrapper>
          </>
        ) : (
          <>
            <FormItemWrapper label="Payment Date" name="date" rules={requiredFieldRules} initialValue={currentTime}>
              <DatePickerWrapper showTime={{ showSecond: false, use12Hours: true, minuteStep: 5 }} />
            </FormItemWrapper>

            <FormItemWrapper label="Amount" name="amount" rules={requiredFieldRules}>
              <InputNumberWrapper min={1} />
            </FormItemWrapper>

            <FormItemWrapper label="Payment Method" name="method" rules={requiredFieldRules}>
              <SelectWrapper options={PaymentOptions} />
            </FormItemWrapper>
          </>
        )}
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
