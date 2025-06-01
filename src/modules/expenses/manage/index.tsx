'use client'
import React from 'react'

import { Form, Input, Row, Select } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import {
  ColWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  InputWrapper,
  ModalWrapper,
  SelectWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, PaymentOptions, requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import { upperFirst } from 'lodash'
import { ExpensesOptions } from '../static/constants'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import dayjs from 'dayjs'

const ExpensesManageComp = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (): Promise<void> => {
    await submit('/employees', {})
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)
  return (
    <ModalWrapper
      title={`${getModalTitle(selectedId as string)}`}
      open={openModal}
      onCancel={closeModal}
      footer={
        <SubmitButtonWrapper
          okText="Save"
          okButtonProps={{ loading: buttonLoading, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
        <FormItemWrapper name="date" label="Date" rules={requiredWithWhitspcFieldRules} initialValue={dayjs()}>
          <DatePickerWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="category" label="Category" rules={requiredFieldRules}>
          <Select options={ExpensesOptions?.map((item: string) => ({ label: upperFirst(item), value: item }))} />
        </FormItemWrapper>

        <FormItemWrapper name="amount" label="Amount" rules={[...requiredFieldRules]}>
          <InputNumberWrapper />
        </FormItemWrapper>
        <FormItemWrapper label="Payment Method" name="payment_method" rules={requiredFieldRules}>
          <SelectWrapper options={PaymentOptions} />
        </FormItemWrapper>


      </Form>
    </ModalWrapper>
  )
}

export default ExpensesManageComp
