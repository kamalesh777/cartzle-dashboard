import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

import type { CompanyFormValues } from '../account-settings/types'

import { ColWrapper, InputWrapper } from '@/components/Wrapper'
import EditCardWrapper from '@/components/Wrapper/EditCardWrapper'
import EditableFormWrapper from '@/components/Wrapper/EditableFormWrapper'
import { requiredWithWhitspcFieldRules } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

const DomainConfig = (): JSX.Element => {
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
        subdomain: data?.subdomain?.replace(`${data.name}.`, ''),
      })
    }
  }, [data])

  const onFinish = (values: any): void => {
    // eslint-disable-next-line no-console
    console.log('===Company Info Submitted:', values)
  }

  return (
    <EditCardWrapper title="Domain Config" id="domain" {...{ editMode, setEditMode, form }}>
      <Form
        form={form}
        onFinish={onFinish}
        labelAlign="left"
        labelCol={{ span: 5, md: 9, lg: 5 }}
        wrapperCol={{ span: 13, md: 11, lg: 13 }}
      >
        <Row>
          <ColWrapper span={24}>
            <EditableFormWrapper
              isLoading={isLoading}
              form={form}
              editMode={editMode}
              name="name"
              label="Company Name"
              rules={requiredWithWhitspcFieldRules}
            >
              <InputWrapper />
            </EditableFormWrapper>
            <EditableFormWrapper isLoading={isLoading} form={form} editMode={editMode} name="subdomain" label="Subdomain">
              <InputWrapper readOnly />
            </EditableFormWrapper>
            <EditableFormWrapper isLoading={isLoading} form={form} editMode={editMode} name="workspaceUrl" label="Website URL">
              <InputWrapper readOnly />
            </EditableFormWrapper>
          </ColWrapper>
        </Row>
      </Form>
    </EditCardWrapper>
  )
}

export default DomainConfig
