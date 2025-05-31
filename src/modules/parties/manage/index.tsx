import React from 'react'

import { Form, Input, InputNumber, Select, Button } from 'antd'

import { FormItemWrapper } from '@/components/Wrapper'

const { TextArea } = Input

interface PropTypes {
  openManageModal: boolean
  setOpenManageModal: (parama: boolean) => void
}

const PartiesManageComp = ({ openManageModal, setOpenManageModal }: PropTypes): JSX.Element => {
  const [form] = Form.useForm()

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        due_payment_reminder: initialValues.due_payment_reminder || '',
      }}
    >
      <FormItemWrapper name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter party name" />
      </FormItemWrapper>

      <FormItemWrapper name="type" label="Party Type" rules={[{ required: true }]}>
        <Select options={partyTypes} />
      </FormItemWrapper>

      <FormItemWrapper name="mobile" label="Mobile" rules={[{ required: true }]}>
        <InputNumber style={{ width: '100%' }} />
      </FormItemWrapper>

      <FormItemWrapper name="alternate_mobile" label="Alternate Mobile">
        <InputNumber style={{ width: '100%' }} />
      </FormItemWrapper>

      <FormItemWrapper name="address" label="Address">
        <TextArea rows={2} />
      </FormItemWrapper>

      <FormItemWrapper name="city" label="City">
        <Input />
      </FormItemWrapper>

      <FormItemWrapper name="state" label="State">
        <Input />
      </FormItemWrapper>

      <FormItemWrapper name="pincode" label="Pincode">
        <Input />
      </FormItemWrapper>

      <FormItemWrapper name="due_payment_reminder" label="Due Payment Reminder">
        <Input placeholder="e.g. every 10th, weekly, etc." />
      </FormItemWrapper>

      <FormItemWrapper name="total_amount" label="Total Amount">
        <InputNumber style={{ width: '100%' }} />
      </FormItemWrapper>

      <FormItemWrapper name="paid_amount" label="Paid Amount">
        <InputNumber style={{ width: '100%' }} />
      </FormItemWrapper>

      <FormItemWrapper name="due_amount" label="Due Amount">
        <InputNumber style={{ width: '100%' }} />
      </FormItemWrapper>

      <FormItemWrapper>
        <Button type="primary" htmlType="submit">
          Save Party
        </Button>
      </FormItemWrapper>
    </Form>
  )
}

export default PartiesManageComp
