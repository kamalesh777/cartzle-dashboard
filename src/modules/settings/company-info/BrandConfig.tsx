import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

import { useDispatch } from 'react-redux'

import type { PropTypes } from './types'
import type { CompanyFormValues } from '../account-settings/types'

import CustomColorPicker from '@/components/Common/CustomColorPicker'
import { FormItemWrapper, CardWrapper, ColWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { applyCompanyData, applyThemeColor } from '@/store/slices/companySlice'

import LogoFaviconUpload from './LogoFaviconUpload'

const BrandConfigComp = ({ data }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()

  const [form] = Form.useForm()
  const formValues = Form.useWatch([], form)
  const { submit } = usePostRequestHandler()

  // Set form values initially
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
    }
  }, [data])

  const updateHandler = async (values: CompanyFormValues): Promise<void> => {
    if (values.hasOwnProperty('themeColor')) {
      await submit('put', '/api/company-update', values, null)
    }
    dispatch(applyCompanyData(formValues))
    dispatch(applyThemeColor(formValues.themeColor))
  }

  // useEffect(() => {
  //   console.log('===formValues', formValues)
  //   dispatch(applyCompanyData(formValues))
  //   dispatch(applyThemeColor(formValues.themeColor))
  // }, [formValues])

  return (
    <CardWrapper title="Brand Config" id="brand" className="mb-3">
      <Form form={form} layout="vertical" onValuesChange={updateHandler}>
        <ColWrapper span={16}>
          <FormItemWrapper name="themeColor" label="Theme Color" className="theme-color" getValueFromEvent={v => v.toHexString()}>
            <CustomColorPicker disabledAlpha showText />
          </FormItemWrapper>
          <Row gutter={COMMON_ROW_GUTTER}>
            <ColWrapper span={12}>
              <LogoFaviconUpload name="logoId" label="Logo" type="logo" form={form} />
            </ColWrapper>
            <ColWrapper span={12}>
              <LogoFaviconUpload name="faviconId" label="Favicon" type="favicon" form={form} />
            </ColWrapper>
          </Row>

          {/* <SubmitButtonWrapper
            okButtonProps={{
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
            /> */}
        </ColWrapper>
      </Form>
    </CardWrapper>
  )
}

export default BrandConfigComp
