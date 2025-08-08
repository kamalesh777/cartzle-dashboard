import React from 'react'

import { Form, Input } from 'antd'

import { CardWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'

const ManageCard = (): JSX.Element => {
  return (
    <CardWrapper title={'Meta'} bottomBorder>
      <Form>
        <FormItemWrapper label="Meta Title" name="seoTitle">
          <InputWrapper placeholder="Best Wooden Chair for Living Room" />
        </FormItemWrapper>

        <FormItemWrapper label="Meta Description" name="seoDescription">
          <Input.TextArea
            placeholder="High-quality wooden chair with premium finish. Perfect for your living room."
            rows={3}
            maxLength={160}
          />
        </FormItemWrapper>

        <FormItemWrapper label="Meta Keywords" name="seoKeywords">
          <InputWrapper placeholder="wooden chair, living room furniture, premium" />
        </FormItemWrapper>

        <FormItemWrapper label="Open Graph Title" name="ogTitle">
          <InputWrapper placeholder="Wooden Chair - MagicBox Furniture" />
        </FormItemWrapper>

        <FormItemWrapper label="Open Graph Image URL" name="ogImage">
          <InputWrapper placeholder="https://example.com/image.jpg" />
        </FormItemWrapper>
      </Form>
    </CardWrapper>
  )
}

export default ManageCard
