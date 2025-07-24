/* eslint-disable no-console */
import React, { useEffect } from 'react'

import { Form, Input, Row } from 'antd'

import type { PropTypes } from './types'

import type { CompanyFormValues } from '../account-settings/types'

import { ColWrapper, InputWrapper, SelectWrapper } from '@/components/Wrapper'
import EditCardWrapper from '@/components/Wrapper/EditCardWrapper'
import EditableFormWrapper from '@/components/Wrapper/EditableFormWrapper'
import { requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'

const CompanyProfileComp = ({ data, isLoading }: PropTypes): JSX.Element => {
  const [form] = Form.useForm()

  const { submit } = usePostRequestHandler()

  const [editMode, setEditMode] = React.useState(false)

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const onFinish = async (values: CompanyFormValues): Promise<void> => {
    await submit('put', '/api/company-update', values, null, () => setEditMode(false))
  }

  return (
    <EditCardWrapper title="Company Details" id="company" {...{ editMode, setEditMode, form }}>
      <Form
        form={form}
        onFinish={onFinish}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 5, md: 9, lg: 5 }}
        wrapperCol={{ span: 13, md: 11, lg: 13 }}
      >
        <Row>
          <ColWrapper span={24}>
            <EditableFormWrapper
              name="name"
              label="Company Name"
              editMode={editMode}
              form={form}
              isLoading={isLoading}
              rules={requiredWithWhitspcFieldRules}
            >
              <InputWrapper />
            </EditableFormWrapper>

            <EditableFormWrapper name="gstin" label="GSTIN Number" editMode={editMode} form={form} isLoading={isLoading}>
              <InputWrapper />
            </EditableFormWrapper>

            <EditableFormWrapper
              name="supportNumber"
              label="Support Number"
              editMode={editMode}
              form={form}
              rules={requiredWithWhitspcFieldRules}
              isLoading={isLoading}
            >
              <InputWrapper />
            </EditableFormWrapper>

            <EditableFormWrapper
              name="supportEmail"
              label="Support Email"
              editMode={editMode}
              form={form}
              rules={requiredWithWhitspcFieldRules}
              isLoading={isLoading}
            >
              <InputWrapper type="email" />
            </EditableFormWrapper>

            <EditableFormWrapper
              name="storageLocation"
              label="Storage Location"
              editMode={editMode}
              form={form}
              isLoading={isLoading}
            >
              <SelectWrapper mode="tags" />
            </EditableFormWrapper>

            <EditableFormWrapper name="address" label="Corp Address" editMode={editMode} form={form} isLoading={isLoading}>
              <Input.TextArea rows={2} />
            </EditableFormWrapper>

            {/* <EditableFormWrapper label="Bank Details">
                <Input.Group compact>
                  <EditableFormWrapper name={['bank_details', 'account_holder']} noStyle>
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
          </ColWrapper>
        </Row>
      </Form>
    </EditCardWrapper>
  )
}

export default CompanyProfileComp
