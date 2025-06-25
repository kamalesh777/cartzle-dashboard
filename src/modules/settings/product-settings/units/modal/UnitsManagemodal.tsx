import React from 'react'

import { Form } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, ModalWrapper, SelectWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

const UnitsManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>) => {
  const [form] = Form.useForm()
  const onFinish = (values: any): void => {
    console.log('===Brand Submitted:', values)
  }
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)

  return (
    <ModalWrapper
      width={400}
      open={openModal}
      onCancel={closeModal}
      title={getModalTitle(selectedId as string)}
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
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormItemWrapper name="unitTypeId" label="Unit Type" rules={requiredFieldRules}>
          <SelectWrapper placeholder="Select unit type" />
        </FormItemWrapper>
        <FormItemWrapper name="value" label="Value" rules={requiredFieldRules}>
          <SelectWrapper mode="tags" tokenSeparators={[' ', ',']} placeholder="Enter value eg. kg, g, ml, l" />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default UnitsManageModal
