import React from 'react'

import { Form, Input } from 'antd'
import dayjs from 'dayjs'

import type { AttendanceFormData } from '../types'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'
import { getDisabledDate, getSelectOption } from '@/utils/disableFunction'

import { DailyEmployeesStatus } from '../static/contstants'

const MarkAttendanceForm = ({ openModal, setOpenModal }: ModalPropTypes<never>): JSX.Element => {
  const [form] = Form.useForm()

  const onFinish = (values: AttendanceFormData): void => {
    const formattedValues = {
      ...values,
    }
    // eslint-disable-next-line no-console
    console.log('Attendance submitted:', formattedValues)
    // Send to API here
  }

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  return (
    <ModalWrapper
      title={'Attendance Status'}
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
      <Form form={form} onFinish={onFinish} layout="vertical" initialValues={{ date: dayjs(), status: 'present' }}>
        <FormItemWrapper label="Date" name="date" rules={requiredFieldRules}>
          <DatePickerWrapper disabledDate={getDisabledDate('before', 2)} />
        </FormItemWrapper>

        <FormItemWrapper label="Status" name="status" rules={requiredFieldRules}>
          <SelectWrapper options={getSelectOption(DailyEmployeesStatus)} />
        </FormItemWrapper>

        <FormItemWrapper label="Remarks (optional)" name="remarks">
          <Input.TextArea rows={2} placeholder="E.g. late arrival, sick leave reason..." />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default MarkAttendanceForm
