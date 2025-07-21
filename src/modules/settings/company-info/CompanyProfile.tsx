/* eslint-disable no-console */
import React, { useEffect } from 'react'

import { Form, Input, Row } from 'antd'

import type { CompanyFormValues } from '../account-settings/types'

import { TableContentLoaderWithProps } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, FormItemWrapper, InputWrapper, SelectWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { useGetRequestHandler } from '@/hook/requestHandler'

const CompanyProfileComp = (): JSX.Element => {
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
    <CardWrapper title="Company Profile" id="company-profile" className="mb-3">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row>
          {isLoading ? (
            <ColWrapper span={16}>
              <TableContentLoaderWithProps columnWidth={[100]} rowCounts={9} verticalGap={20} rowHeight={100} />
            </ColWrapper>
          ) : (
            <ColWrapper span={16}>
              <Row gutter={COMMON_ROW_GUTTER}>
                <ColWrapper span={16}>
                  <FormItemWrapper name="name" label="Company Name" rules={requiredWithWhitspcFieldRules}>
                    <InputWrapper />
                  </FormItemWrapper>
                </ColWrapper>
                <ColWrapper span={8}>
                  <FormItemWrapper name="suffixDomain" label="Suffix Domain">
                    <InputWrapper readOnly />
                  </FormItemWrapper>
                </ColWrapper>
              </Row>
              <FormItemWrapper name="workspaceUrl" label="Website">
                <InputWrapper readOnly />
              </FormItemWrapper>

              <FormItemWrapper name="gstin" label="GSTIN">
                <InputWrapper />
              </FormItemWrapper>

              <FormItemWrapper name="address" label="Address" rules={requiredWithWhitspcFieldRules}>
                <Input.TextArea rows={2} />
              </FormItemWrapper>

              <FormItemWrapper name="supportNumber" label="Support Number" rules={requiredWithWhitspcFieldRules}>
                <InputWrapper />
              </FormItemWrapper>

              <FormItemWrapper name="supportEmail" label="Support Email" rules={requiredWithWhitspcFieldRules}>
                <InputWrapper type="email" />
              </FormItemWrapper>

              <FormItemWrapper name="storageLocation" label="Storage Location">
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
          )}
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default CompanyProfileComp
