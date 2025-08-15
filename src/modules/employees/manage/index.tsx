'use client'
import React from 'react'

import { Form, Input, Row } from 'antd'

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
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'
import { getSelectOption } from '@/utils/disableFunction'

import { JobTypeOptions } from '../static/contstants'

const EmployeesManageComp = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (): Promise<void> => {
    await submit(selectedId, '/employees', {})
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)
  return (
    <ModalWrapper
      bodyScroll
      title={`${getModalTitle(selectedId as string)}`}
      open={openModal}
      onCancel={closeModal}
      footer={
        <SubmitButtonWrapper
          okText={getModalTitle(selectedId as string)}
          okButtonProps={{ loading: buttonLoading, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <FormWrapper form={form} onFinish={formSubmitHandler}>
        <FormItemWrapper name="name" label="Name" rules={requiredWithWhitspcFieldRules}>
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper label="Role" name="role" rules={requiredFieldRules}>
          <SelectWrapper />
        </FormItemWrapper>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="mobile" label="Mobile" rules={[...requiredFieldRules]}>
              <InputNumberWrapper maxLength={10} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="alternateMobile" label="Alternate Mobile">
              <InputNumberWrapper maxLength={10} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper name="address" label="Address" rules={[...requiredFieldRules]}>
              <Input.TextArea rows={3} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper label="Joining Date" name="joining_date" rules={requiredFieldRules}>
              <DatePickerWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper label="Job Type" name="job_type" rules={requiredFieldRules}>
              <SelectWrapper options={getSelectOption(JobTypeOptions)} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper label="Salary Type" name="salary_type" rules={requiredFieldRules}>
              <SelectWrapper options={getSelectOption(['monthly', 'daily'])} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper label="Salary Amount (₹)" name="salary_amount" rules={requiredFieldRules}>
              <InputNumberWrapper min={0} />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
      </FormWrapper>
    </ModalWrapper>
  )
}

export default EmployeesManageComp
