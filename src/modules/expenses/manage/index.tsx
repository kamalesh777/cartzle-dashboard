'use client'
import React from 'react'

import { Form, Select } from 'antd'

import dayjs from 'dayjs'
import { upperFirst } from 'lodash'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, InputNumberWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { PaymentOptions, requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

import { ExpensesOptions } from '../static/constants'

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
