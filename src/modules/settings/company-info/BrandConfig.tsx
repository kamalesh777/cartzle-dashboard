import React, { useState } from 'react'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

import { Form, Row, Upload } from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import CustomColorPicker from '@/components/Common/CustomColorPicker'
import {
  FormItemWrapper,
  CardWrapper,
  InputWrapper,
  SpaceWrapper,
  ButtonWrapper,
  ColWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import { applyThemeColor } from '@/store/slices/themeSlice'

const BrandConfigComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const themeState = useSelector((state: RootState) => state.theme.token)
  // const imageUrl = Form.useWatch('logo_url', form)

  const [imgLoading] = useState<boolean>(false)

  const formSubmitHandler = (formVal: any): void => {
    // eslint-disable-next-line prettier/prettier, no-console
    console.log("==formVal", formVal)
  }

  const uploadButton = (
    <ButtonWrapper style={{ border: 0, background: 'none' }}>
      <SpaceWrapper align="center">
        {imgLoading ? <LoadingOutlined /> : <UploadOutlined />}
        Browse
      </SpaceWrapper>
    </ButtonWrapper>
  )

  return (
    <CardWrapper title="Theme Config" id="theme-config" className="mb-3">
      <Form form={form} layout="vertical" onFinish={formSubmitHandler}>
        <Row>
          <ColWrapper span={16}>
            <FormItemWrapper
              name="theme_color"
              label="Select theme color"
              className="theme-color"
              initialValue={themeState?.colorPrimary}
            >
              <CustomColorPicker disabledAlpha showText onChange={v => dispatch(applyThemeColor(v.toHexString()))} />
            </FormItemWrapper>
            <FormItemWrapper name="logo_url" label="Logo">
              <InputWrapper
                addonAfter={
                  <Upload maxCount={1} className="mx-n3" showUploadList={false}>
                    {uploadButton}
                  </Upload>
                }
              />
            </FormItemWrapper>
            <FormItemWrapper name="favicon_url" label="Favicon">
              <InputWrapper
                addonAfter={
                  <Upload maxCount={1} className="mx-n3" showUploadList={false}>
                    {uploadButton}
                  </Upload>
                }
              />
            </FormItemWrapper>
            <SubmitButtonWrapper />
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
}

export default BrandConfigComp
