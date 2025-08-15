import React from 'react'

import { Form, Input, Radio, Row, type RadioChangeEvent } from 'antd'

import dayjs from 'dayjs'

import { upperFirst } from 'lodash'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import {
  CardWrapper,
  ColWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
  RadioWrapper,
  SelectWrapper,
  SpaceWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { COMMON_ROW_GUTTER, PaymentOptions, requiredFieldRules } from '@/constants/AppConstant'
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions'

import { getDisabledDate } from '@/utils/disableFunction'

import { TransactionTypeOptions } from '../static/constants'

const AddPaymentModal = ({ openModal, setOpenModal, afterSubmit }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()
  const isMissedPayment = Form.useWatch('transaction_type', form) === TransactionTypeOptions[3]
  const isNormalTransaction = Form.useWatch('transaction_type', form) === TransactionTypeOptions[1] // normal

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
      bodyScroll
      footer={
        <SubmitButtonWrapper
          okText={'Save'}
          okButtonProps={{ loading: false, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <FormWrapper form={form} onFinish={handleFinish}>
        <FormItemWrapper
          className="mb-3"
          label="Select Transaction type"
          name="transaction_type"
          initialValue={TransactionTypeOptions[0]}
        >
          <Radio.Group
            onChange={(e: RadioChangeEvent) => form.setFieldValue('transaction_type', e.target.value)}
          >
            {TransactionTypeOptions?.map(item => (
              <RadioWrapper key={item} value={item}>
                {upperFirst(item)}
              </RadioWrapper>
            ))}
          </Radio.Group>
        </FormItemWrapper>
        {isNormalTransaction && (
          <>
            <CardWrapper className="mb-3 bg-gray-100" styles={{ body: { padding: '10px' } }}>
              <Row gutter={COMMON_ROW_GUTTER}>
                <ColWrapper md={10}>
                  <SpaceWrapper>
                    Total: <span className="fw-bold">{getDecimal(220000, true)}</span>
                  </SpaceWrapper>
                </ColWrapper>
                <ColWrapper md={7}>
                  <SpaceWrapper>
                    Paid: <span className="fw-bold success-color">{getDecimal(20000, true)}</span>
                  </SpaceWrapper>
                </ColWrapper>
                <ColWrapper md={7}>
                  <SpaceWrapper>
                    Due: <span className="error-color fw-bold">{getDecimal(2000, true)}</span>
                  </SpaceWrapper>
                </ColWrapper>
              </Row>
            </CardWrapper>
          </>
        )}

        {/* if user failed to pay then schedule a next date */}
        {isMissedPayment ? (
          <>
            <FormItemWrapper label="Promised Date" name="promised_date" rules={requiredFieldRules}>
              <DatePickerWrapper showNow={false} disabledDate={getDisabledDate('before', 0)} />
            </FormItemWrapper>
            <FormItemWrapper label="Promised Amount" name="promised_amount" rules={requiredFieldRules}>
              <InputNumberWrapper min={1} />
            </FormItemWrapper>
          </>
        ) : (
          <>
            <FormItemWrapper
              label="Payment Date"
              name="date"
              rules={requiredFieldRules}
              initialValue={currentTime}
            >
              <DatePickerWrapper showTime={{ showSecond: false, use12Hours: true, minuteStep: 5 }} />
            </FormItemWrapper>

            <FormItemWrapper label="Amount" name="amount" rules={requiredFieldRules}>
              <InputNumberWrapper min={1} />
            </FormItemWrapper>

            <FormItemWrapper label="Payment Method" name="payment_method" rules={requiredFieldRules}>
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
      </FormWrapper>
    </ModalWrapper>
  )
}

export default AddPaymentModal
