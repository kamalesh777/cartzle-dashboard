'use client'
import React from 'react'

import { Form, Input, Row, Select, Space } from 'antd'

import {
  ButtonWrapper,
  ColWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  InputWrapper,
  ModalWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { partyTypeOptions } from '../static/constants'

interface PropTypes {
  openManageModal: boolean
  setOpenManageModal: (parama: boolean) => void
}

const PartiesManageComp = ({ openManageModal, setOpenManageModal }: PropTypes): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (): Promise<void> => await submit()

  // close modal handler
  const closeModal = () => modalCloseHandler(setOpenManageModal, form)
  return (
    <ModalWrapper
      bodyScroll
      title="Update Details"
      open={openManageModal}
      onCancel={closeModal}
      footer={
        <Space>
          <SubmitButtonWrapper loading={buttonLoading} onClick={() => form.submit()} />
          <ButtonWrapper onClick={closeModal}>Cancel</ButtonWrapper>
        </Space>
      }
    >
      <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
        <FormItemWrapper name="name" label="Name" rules={requiredWithWhitspcFieldRules}>
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="type" label="Party Type" rules={requiredFieldRules}>
          <Select options={partyTypeOptions} />
        </FormItemWrapper>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="mobile" label="Mobile" rules={requiredFieldRules}>
              <InputNumberWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="alternate_mobile" label="Alternate Mobile">
              <InputNumberWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper name="address" label="Address">
              <Input.TextArea rows={3} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="state" label="State">
              <InputWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="pincode" label="Pincode">
              <InputWrapper />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
      </Form>
    </ModalWrapper>
  )
}

export default PartiesManageComp
