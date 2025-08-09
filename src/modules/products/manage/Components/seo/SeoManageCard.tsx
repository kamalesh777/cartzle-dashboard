/* eslint-disable no-duplicate-imports */
import React from 'react'

import { Form, Input } from 'antd'

import type { FormInstance } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { FormItemWrapper, InputWrapper, ModalWrapper } from '@/components/Wrapper'
import { requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

interface Props extends ModalPropTypes<never> {
  form: FormInstance
}

const SeoManageCard = ({ openModal, setOpenModal, form }: Props): JSX.Element => {
  const formValues = Form.useWatch([], form)
  form.setFieldValue('seo', formValues?.seo)

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  return (
    <ModalWrapper title={'Update Meta'} open={openModal} onCancel={closeModal} bodyScroll>
      <Form layout="vertical" form={form}>
        <FormItemWrapper label="Meta Title" name={['seo', 'title']} rules={requiredFieldRules}>
          <InputWrapper placeholder="eg.Best Wooden Chair for Living Room" />
        </FormItemWrapper>

        <FormItemWrapper label="Meta Description" name={['seo', 'description']} rules={requiredFieldRules}>
          <Input.TextArea
            placeholder="eg. High-quality wooden chair with premium finish. Perfect for your living room."
            rows={3}
            maxLength={160}
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
