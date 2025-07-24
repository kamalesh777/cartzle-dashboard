import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import type { PropTypes } from './types'
import type { CompanyFormValues } from '../account-settings/types'
import type { RootState } from '@/store/index'

import CustomColorPicker from '@/components/Common/CustomColorPicker'
import { FormItemWrapper, CardWrapper, ColWrapper, SubmitButtonWrapper } from '@/components/Wrapper'
import { usePostRequestHandler } from '@/hook/requestHandler'
import { applyThemeColor } from '@/store/slices/companySlice'

import LogoFaviconUpload from './LogoFaviconUpload'

const BrandConfigComp = ({ data }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()
  const companyState = useSelector((state: RootState) => state.company)

  const [form] = Form.useForm()
  const { submit } = usePostRequestHandler()

  const [isValueChanged, setIsValueChanged] = React.useState(false)

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
      dispatch(applyThemeColor(data.themeColor))
    }
  }, [data])

  // on submit handler
  const onFinish = async (values: CompanyFormValues): Promise<void> => {
    await submit('put', '/api/company-update', values, null, () => setIsValueChanged(false))
  }

  return (
    <CardWrapper title="Theme Config" id="theme" className="mb-3">
      <Form form={form} layout="vertical" onFinish={onFinish} onValuesChange={() => setIsValueChanged(true)}>
        <Row>
          <ColWrapper span={16}>
            <FormItemWrapper
              name="themeColor"
              label="Select theme color"
              className="theme-color"
              // initialValue={companyState?.token?.colorPrimary}
              getValueFromEvent={v => v.toHexString()}
            >
              <CustomColorPicker disabledAlpha showText onChange={v => dispatch(applyThemeColor(v.toHexString()))} />
            </FormItemWrapper>
            <LogoFaviconUpload name="logoUrl" label="Logo" type="logo" form={form} />
            <LogoFaviconUpload name="faviconUrl" label="Favicon" type="favicon" form={form} />
            {isValueChanged && (
              <SubmitButtonWrapper
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
              />
            )}
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default BrandConfigComp
