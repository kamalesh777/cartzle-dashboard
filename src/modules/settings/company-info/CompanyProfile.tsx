/* eslint-disable no-console */
import React, { useEffect } from 'react'

import { Form, Input, Row } from 'antd'

import type { CompanyFormValues } from '../account-settings/types'

import { ButtonWrapper, CardWrapper, ColWrapper, InputWrapper, SelectWrapper, SpaceWrapper } from '@/components/Wrapper'
import EditableFormWrapper from '@/components/Wrapper/EditableFormWrapper'
import { requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler } from '@/hook/requestHandler'

const CompanyProfileComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const [editMode, setEditMode] = React.useState(false)

  const { fetchData, isLoading, data } = useGetRequestHandler<CompanyFormValues>()

  useEffect(() => {
    fetchData('/api/company-details')
  }, [])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        suffixDomain: data?.subdomain?.replace(`${data.name}.`, ''),
      })
    }
  }, [data])

  const onFinish = (values: any): void => {
    console.log('===Company Info Submitted:', values)
  }

  const extraContent = editMode ? (
    <SpaceWrapper>
      <ButtonWrapper type="primary" onClick={() => setEditMode(false)}>
        Save
      </ButtonWrapper>
      <ButtonWrapper type="default" onClick={() => setEditMode(false)}>
        Cancel
      </ButtonWrapper>
    </SpaceWrapper>
  ) : (
    <ButtonWrapper type="primary" onClick={() => setEditMode(true)}>
      Edit
    </ButtonWrapper>
  )

  return (
    <CardWrapper title="Company Details" id="company" className="mb-3" extra={extraContent}>
      <Form
        form={form}
        onFinish={onFinish}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 5, md: 9, lg: 5 }}
        wrapperCol={{ span: 15, md: 11, lg: 15 }}
      >
        <Row>
          <ColWrapper span={24}>
            <EditableFormWrapper name="name" label="Company Name" editMode={editMode} form={form} isLoading={isLoading}>
              <InputWrapper />
            </EditableFormWrapper>

            <EditableFormWrapper
              name="gstin"
              label="GSTIN Number"
              editMode={editMode}
              form={form}
              rules={requiredWithWhitspcFieldRules}
              isLoading={isLoading}
            >
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
    </CardWrapper>
  )
}

export default CompanyProfileComp
