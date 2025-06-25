import React from 'react'

import { Form } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, InputWrapper, ModalWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { getModalTitle, modalCloseHandler } from '@/utils/commonFunctions'

const UnitTypeManageModal = ({ openModal, setOpenModal, selectedId }: ModalPropTypes<never>) => {
  const { submit } = usePostRequestHandler()
  const [form] = Form.useForm()
  const onFinish = (values: any): void => {
    submit('create-unit-type', values, null)
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
        <FormItemWrapper name="name" label="Name" rules={requiredFieldRules}>
          <InputWrapper placeholder="Enter name eg. width, height, length" />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default UnitTypeManageModal
