import React, { useEffect, useState } from 'react'

import { Form, Row } from 'antd'

import { useDispatch } from 'react-redux'

import type { PropTypes } from './types'
import type { CompanyFormValues } from '../account-settings/types'

import { postRequest } from '@/api/preference/RequestService'
import CustomColorPicker from '@/components/Common/CustomColorPicker'
import { FormItemWrapper, CardWrapper, ColWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'

import { applyCompanyData, applyThemeColor } from '@/store/slices/companySlice'

import LogoFaviconUpload from './LogoFaviconUpload'

const BrandConfigComp = ({ data }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const { submit, buttonLoading } = usePostRequestHandler()
  const [isValueChanged, setIsValueChanged] = useState(false)

  // Set form values initially
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  // Update handler
  const updateHandler = async (values: CompanyFormValues): Promise<void> => {
    if (values?.hasOwnProperty('logoId') || values?.hasOwnProperty('faviconId')) {
      const keys = Object.keys(values)

      for (const key of keys) {
        const value = values[key as keyof CompanyFormValues]

        if (typeof value === 'string' && value?.startsWith('data:image')) {
          const type = key === 'logoId' ? 'logo' : 'favicon'
          const payload = {
            base64: value,
            name: `${type}.webp`,
            type,
          }

          const resp = await postRequest('/api/brand-media-upload', payload)
          const data = resp.data.result
          form.setFieldsValue({ [key]: data.fileId, versionName: data.versionInfo.name })
        }
      }
    }
    // get the latest form value after media upload
    const formValues = form.getFieldsValue()

    // ✅ Always submit updated company data
    await submit('put', '/api/company-update', formValues, null)

    // after update show the latest data in the app
    dispatch(applyCompanyData(formValues))
    dispatch(applyThemeColor(formValues.themeColor))
  }

  return (
    <CardWrapper title="Brand Config" id="brand" className="mb-3">
      <Form form={form} layout="vertical" onFinish={updateHandler} onValuesChange={() => setIsValueChanged(true)}>
        <ColWrapper span={16}>
          <FormItemWrapper name="themeColor" label="Theme Color" className="theme-color" getValueFromEvent={v => v.toHexString()}>
            <CustomColorPicker disabledAlpha showText />
          </FormItemWrapper>
          <Row gutter={COMMON_ROW_GUTTER}>
            <FormItemWrapper name="versionName" hidden />
            <ColWrapper md={12}>
              <LogoFaviconUpload name="logoId" label="Logo" type="logo" form={form} />
            </ColWrapper>
            <ColWrapper md={12}>
              <LogoFaviconUpload name="faviconId" label="Favicon" type="favicon" form={form} />
            </ColWrapper>
          </Row>
          {isValueChanged && (
            <SubmitButtonWrapper
              okButtonProps={{
                loading: buttonLoading,
                onClick: () => {
                  form.submit()
                  setIsValueChanged(false)
                },
              }}
              cancelButtonProps={{
                onClick: () => {
                  form.setFieldsValue(data)
                  setIsValueChanged(false)
                },
              }}
            />
          )}
        </ColWrapper>
      </Form>
    </CardWrapper>
  )
}

export default BrandConfigComp
