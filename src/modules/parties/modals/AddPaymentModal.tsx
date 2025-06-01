import React from 'react'

import { Form, Input, Radio, Row, Space, type RadioChangeEvent } from 'antd'

import dayjs from 'dayjs'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import {
  CardWrapper,
  ColWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
  SelectWrapper,
  SpaceWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions'

import { disabledUptoCurrentDate } from '@/utils/disableFunction'

import { PaymentOptions, TransactionTypeOptions } from '../static/constants'

const MISSED_CONST = 'missed'

const AddPaymentModal = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  const isMissedPayment = Form.useWatch('status', form) === MISSED_CONST
  const isNormalTransaction = Form.useWatch('transaction_type', form) === TransactionTypeOptions[1]

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
        <FormItemWrapper label="Select Transaction type" name="transaction_type" initialValue={TransactionTypeOptions[0]}>
          <Radio.Group onChange={(e: RadioChangeEvent) => form.setFieldValue('transaction_type', e.target.value)}>
            {TransactionTypeOptions?.map(item => (<Radio value={item}>{item}</Radio>))}
          </Radio.Group>
        </FormItemWrapper>
        {
          isNormalTransaction && (
            <>
              <CardWrapper className='mb-3 bg-gray-100' styles={{ body: { padding: '10px' } }}>
                <Row gutter={COMMON_ROW_GUTTER}>
                  <ColWrapper md={10}>
                    <SpaceWrapper>Total: <span className='fw-bold'>{getDecimal(220000, true)}</span></SpaceWrapper>
                  </ColWrapper>
                  <ColWrapper md={7}>
                    <SpaceWrapper>Paid: <span className='fw-bold success-color'>{getDecimal(20000, true)}</span></SpaceWrapper>
                  </ColWrapper>
                  <ColWrapper md={7}>
                    <SpaceWrapper>Due: <span className='error-color fw-bold'>{getDecimal(2000, true)}</span></SpaceWrapper>
                  </ColWrapper>
                </Row>
              </CardWrapper><FormItemWrapper name="status" initialValue={MISSED_CONST}>
                  <Radio.Group onChange={(e: RadioChangeEvent) => form.setFieldValue('status', e.target.value)}>
                    <Radio value={MISSED_CONST}>Missed</Radio>
                    <Radio value="paid">Paid</Radio>
                  </Radio.Group>
                </FormItemWrapper>
              </>
          )
        }
        
        
        {/* if user failed to pay then schedule a next date */}
        {isMissedPayment ? (
          <>
            <FormItemWrapper label="Promised Date" name="promised_date" rules={requiredFieldRules}>
              <DatePickerWrapper showNow={false} disabledDate={disabledUptoCurrentDate} />
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

export default AddPaymentModal
