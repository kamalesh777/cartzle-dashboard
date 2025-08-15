import React from 'react'

import { Form, Select, Input } from 'antd'

import dayjs, { type Dayjs } from 'dayjs'

import type { EmployeePaymentFormData } from '../types'
import type { ModalPropTypes } from 'src/types/common'

import {
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
  SelectWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'

import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'

const {} = Select

const ManagePaymentModal: React.FC<ModalPropTypes<never>> = ({
  openModal,
  setOpenModal,
}: ModalPropTypes<never>) => {
  const [form] = Form.useForm()

  const handleFinish = (values: EmployeePaymentFormData): void => {
    const payload = {
      ...values,
      date: (values.date as Dayjs).format('YYYY-MM-DD'),
    }
    // eslint-disable-next-line no-console
    console.log('==', payload)
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      title={'Manage Payment'}
      open={openModal}
      onCancel={closeModal}
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
      <FormWrapper
        form={form}
        onFinish={handleFinish}
        initialValues={{ date: dayjs(), paymentType: 'salary' }}
      >
        <FormItemWrapper label="Payment Date" name="date" rules={requiredFieldRules}>
          <DatePickerWrapper />
        </FormItemWrapper>

        <FormItemWrapper label="Payment Type" name="paymentType" rules={requiredFieldRules}>
          <SelectWrapper options={getSelectOption(['salary', 'advance'])} />
        </FormItemWrapper>

        <FormItemWrapper label="Amount" name="amount" rules={requiredFieldRules}>
          <InputNumberWrapper />
        </FormItemWrapper>

        <FormItemWrapper label="Notes" name="notes">
          <Input.TextArea rows={2} placeholder="e.g. Paid 50% in advance" />
        </FormItemWrapper>
      </FormWrapper>
    </ModalWrapper>
  )
}

export default ManagePaymentModal
