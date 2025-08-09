import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

import type { PropTypes } from './types'

import { ColWrapper, InputWrapper } from '@/components/Wrapper'
import EditCardWrapper from '@/components/Wrapper/EditCardWrapper'
import EditableFormWrapper from '@/components/Wrapper/EditableFormWrapper'

const DomainConfig = ({ isLoading, data }: PropTypes): JSX.Element => {
  const [form] = Form.useForm()

  const [editMode, setEditMode] = React.useState(false)

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              name="subdomain"
              label="Subdomain"
            >
              <InputWrapper readOnly />
            </EditableFormWrapper>
            <EditableFormWrapper
              isLoading={isLoading}
              form={form}
              editMode={editMode}
              name="workspaceUrl"
              label="Website URL"
            >
              <InputWrapper readOnly />
            </EditableFormWrapper>
          </ColWrapper>
        </Row>
      </Form>
    </EditCardWrapper>
  )
}

export default DomainConfig
