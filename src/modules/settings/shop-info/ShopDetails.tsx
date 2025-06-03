/* eslint-disable no-console */
import React from 'react'

import { Form, Input } from 'antd'

import { ButtonWrapper, CardWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'

const ShopDetailsComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    console.log('Shop Info Submitted:', values)
  }
  return (
    <CardWrapper title="Shop Information" id="shop-config" className="mb-3">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormItemWrapper name="name" label="Shop Name" rules={[{ required: true }]}>
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="gstin" label="GSTIN">
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="address" label="Address" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </FormItemWrapper>

        <FormItemWrapper name="contact_number" label="Contact Number" rules={[{ required: true }]}>
          <InputWrapper />
        </FormItemWrapper>

        <FormItemWrapper name="email" label="Email">
          <InputWrapper type="email" />
        </FormItemWrapper>

        <FormItemWrapper name="invoice_prefix" label="Invoice Prefix">
          <InputWrapper />
        </FormItemWrapper>

        {/* <FormItemWrapper label="Bank Details">
          <Input.Group compact>
            <FormItemWrapper name={['bank_details', 'account_holder']} noStyle>
              <Input style={{ width: '50%' }} placeholder="Account Holder" />
            </FormItemWrapper>
            <FormItemWrapper name={['bank_details', 'account_number']} noStyle>
              <Input style={{ width: '50%' }} placeholder="Account Number" />
            </FormItemWrapper>
            <FormItemWrapper name={['bank_details', 'ifsc_code']} noStyle>
              <Input style={{ width: '50%' }} placeholder="IFSC Code" />
            </FormItemWrapper>
            <FormItemWrapper name={['bank_details', 'bank_name']} noStyle>
              <Input style={{ width: '50%' }} placeholder="Bank Name" />
            </FormItemWrapper>
          </Input.Group>
        </FormItemWrapper> */}

        <FormItemWrapper>
          <ButtonWrapper type="primary" htmlType="submit">
            Save Info
          </ButtonWrapper>
        </FormItemWrapper>
      </Form>
    </CardWrapper>
  )
}

export default ShopDetailsComp
