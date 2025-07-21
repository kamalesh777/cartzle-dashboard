/* eslint-disable no-console */
import React from 'react'

import { Form, Input, Row } from 'antd'

import { ButtonWrapper, CardWrapper, ColWrapper, FormItemWrapper, InputWrapper, SelectWrapper } from '@/components/Wrapper'

const CompanyProfileComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const onFinish = (values: any): void => {
    console.log('===Company Info Submitted:', values)
  }
  return (
    <CardWrapper title="Company Profile" id="company-profile" className="mb-3">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row>
          <ColWrapper span={16}>
            <FormItemWrapper name="name" label="Company Name" rules={[{ required: true }]}>
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

            <FormItemWrapper name="storage_location" label="Storage Location">
              <SelectWrapper mode="tags" />
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
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default CompanyProfileComp
