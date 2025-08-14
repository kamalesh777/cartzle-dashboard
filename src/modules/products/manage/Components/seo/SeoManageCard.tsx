/* eslint-disable no-duplicate-imports */
import React, { useEffect } from 'react'

import { RedoOutlined } from '@ant-design/icons'

import { Form, Input } from 'antd'

import type { FormInstance } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import {
  ButtonWrapper,
  FormItemWrapper,
  InputWrapper,
  ModalWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

interface Props extends ModalPropTypes<{ title: string }> {
  extra?: any
  form: FormInstance
}

const SeoManageCard = ({ openModal, setOpenModal, selectedList, form }: Props): JSX.Element => {
  const [seoForm] = Form.useForm()
  useEffect(() => {
    seoForm.setFieldsValue({ seo: selectedList })
  }, [selectedList])

  // close modal handler
  const closeModal = (): void => {
    modalCloseHandler(setOpenModal)
  }

  const resetHandler = (): void => {
    seoForm.setFieldsValue({ seo: selectedList })
  }

  const onFinish = (values: any): void => {
    form.setFieldValue('seo', values.seo)
    closeModal()
  }

  const FooterButton = (
    <div className="d-flex justify-content-between mt-3 w-100">
      <div>
        <ButtonWrapper type="default" onClick={resetHandler} icon={<RedoOutlined />}>
          Reset
        </ButtonWrapper>
      </div>
      <SpaceWrapper>
        <ButtonWrapper type="primary" onClick={() => seoForm.submit()}>
          Save
        </ButtonWrapper>
        <ButtonWrapper type="default" onClick={closeModal}>
          Cancel
        </ButtonWrapper>
      </SpaceWrapper>
    </div>
  )

  return (
    <ModalWrapper
      title={'Update Meta'}
      open={openModal}
      onCancel={closeModal}
      bodyScroll
      footer={FooterButton}
    >
      <Form layout="vertical" form={seoForm} onFinish={onFinish}>
        <FormItemWrapper label="Meta Title" name={['seo', 'title']} rules={requiredFieldRules}>
          <InputWrapper placeholder="eg.Best Wooden Chair for Living Room" />
        </FormItemWrapper>

        <FormItemWrapper label="Meta Description" name={['seo', 'description']} rules={requiredFieldRules}>
          <Input.TextArea
            placeholder="eg. High-quality wooden chair with premium finish. Perfect for your living room."
            rows={4}
          />
        </FormItemWrapper>

        <FormItemWrapper label="Meta Keywords" name={['seo', 'keywords']}>
          <InputWrapper placeholder="eg. wooden chair, living room furniture, premium" />
        </FormItemWrapper>

        <FormItemWrapper label="Open Graph Title" name={['seo', 'ogTitle']} rules={requiredFieldRules}>
          <InputWrapper placeholder="eg. Wooden Chair - MagicBox Furniture" />
        </FormItemWrapper>

        <FormItemWrapper label="Open Graph Image URL" name={['seo', 'ogImage']} rules={requiredFieldRules}>
          <InputWrapper placeholder="eg. https://example.com/image.jpg" />
        </FormItemWrapper>
      </Form>
    </ModalWrapper>
  )
}

export default SeoManageCard
