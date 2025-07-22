import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

import type { CompanyFormValues } from '../account-settings/types'

import { TableContentLoaderWithProps } from '@/components/Common'
import { CardWrapper, ColWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import { requiredWithWhitspcFieldRules } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

const DomainConfig = (): JSX.Element => {
  const [form] = Form.useForm()

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

  return (
    <CardWrapper title="Domain Config" id="domain" className="mb-3">
      <Form form={form} onFinish={onFinish} labelAlign="left" labelCol={{ span: 6 }} wrapperCol={{ span: 12 }}>
        <Row>
          {isLoading ? (
            <ColWrapper span={16}>
              <TableContentLoaderWithProps columnWidth={[100]} rowCounts={9} verticalGap={20} rowHeight={100} />
            </ColWrapper>
          ) : (
            <ColWrapper span={16}>
              <FormItemWrapper name="name" label="Company Name" rules={requiredWithWhitspcFieldRules}>
                <InputWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="suffixDomain" label="Suffix Domain">
                <InputWrapper readOnly />
              </FormItemWrapper>
              <FormItemWrapper name="workspaceUrl" label="Website">
                <InputWrapper readOnly />
              </FormItemWrapper>
            </ColWrapper>
          )}
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default DomainConfig
