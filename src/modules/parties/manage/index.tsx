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
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { PartyTypeOptions } from '../static/constants'

const PartiesManageComp = ({ openModal, setOpenModal }: ModalPropTypes): JSX.Element => {
  const [form] = Form.useForm()

  const { submit, buttonLoading } = usePostRequestHandler()

  const formSubmitHandler = async (): Promise<void> => await submit()

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal, form)
  return (
    <ModalWrapper
      bodyScroll
      title="Update Details"
      open={openModal}
      onCancel={closeModal}
      footer={
        <SubmitButtonWrapper
          okText="Add Payment"
          okButtonProps={{ loading: buttonLoading, onClick: () => form.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
        <FormItemWrapper name="name" label="Name" rules={requiredWithWhitspcFieldRules}>
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="type" label="Party Type" rules={requiredFieldRules}>
          <Select options={PartyTypeOptions} />
        </FormItemWrapper>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="mobile" label="Mobile" rules={[...requiredFieldRules]}>
              <InputNumberWrapper maxLength={10} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="alternate_mobile" label="Alternate Mobile">
              <InputNumberWrapper maxLength={10} />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={24}>
            <FormItemWrapper name="address" label="Address" rules={[...requiredFieldRules]}>
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
