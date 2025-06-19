/* eslint-disable no-console */
import React from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Form, Input, Row, Upload } from 'antd'

import { useParams } from 'next/navigation'

import type { ProductFormValueTypes } from '../types'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import {
  CardWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  InputWrapper,
  SelectWrapper,
  ColWrapper,
  ButtonWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'
import {
  categoriesOptions,
  COMMON_ROW_GUTTER,
  PRODUCT_LIST_ROUTE,
  requiredFieldRules,
  requiredWithWhitspcFieldRules,
} from '@/constants/AppConstant'
import { getCardTitle } from '@/utils/commonFunctions'

// main function
const ProductManageComp = (): JSX.Element => {
  const params = useParams()
  const cardTitle = `${getCardTitle(params)} Products`

  const [form] = Form.useForm()
  const isRawMaterial = Form.useWatch('category', form) === 'raw'

  const formSubmitHandler = async (formValue: ProductFormValueTypes): Promise<void> => {
    console.log('===formValue', formValue)
  }
  console.log('===isRawMaterial', isRawMaterial)

  const COMMON_FIELDS = (
    <>
      <ColWrapper md={12}>
        <FormItemWrapper name="stock_location" label="Stock Location">
          <SelectWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper md={12}>
        <FormItemWrapper name="cost_price" label="Cost Price" rules={requiredFieldRules}>
          <InputNumberWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper md={12}>
        <FormItemWrapper
          name="sale_price"
          label="Sale Price"
          dependencies={['cost_price']}
          rules={[
            ...requiredFieldRules,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || value > getFieldValue('cost_price')) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Sale price should be greater than Cost price!'))
              },
            }),
          ]}
        >
          <InputNumberWrapper />
        </FormItemWrapper>
      </ColWrapper>
    </>
  )
  const MAIN_COMP = (
    <CardWrapper title={cardTitle}>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler} initialValues={{ category: 'raw' }}>
        <Row gutter={COMMON_ROW_GUTTER} justify={'space-between'}>
          {/* Left side fields */}
          <ColWrapper md={14}>
            <FormItemWrapper name="title" label="Title" rules={requiredWithWhitspcFieldRules}>
              <InputWrapper />
            </FormItemWrapper>
            <FormItemWrapper name="description" label="Description">
              <Input.TextArea rows={3} />
            </FormItemWrapper>

            <FormItemWrapper name="media" label="Media">
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                {/* <small className="ant-upload-hint">Only Accept  </small> */}
              </Upload.Dragger>
            </FormItemWrapper>

            <Row gutter={COMMON_ROW_GUTTER}>
              <ColWrapper md={12}>
                <FormItemWrapper name="cost_price" label="Cost Price" rules={requiredFieldRules}>
                  <InputNumberWrapper />
                </FormItemWrapper>
              </ColWrapper>
              <ColWrapper md={12}>
                <FormItemWrapper
                  name="sale_price"
                  label="Sale Price"
                  dependencies={['cost_price']}
                  rules={[
                    ...requiredFieldRules,
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || value > getFieldValue('cost_price')) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Sale price should be greater than Cost price!'))
                      },
                    }),
                  ]}
                >
                  <InputNumberWrapper />
                </FormItemWrapper>
              </ColWrapper>
            </Row>
          </ColWrapper>

          {/* Right side fields */}
          <ColWrapper md={9}>
            <FormItemWrapper name="party" label="Party's Name" rules={requiredWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
            <FormItemWrapper name="type" label="Type" rules={requiredWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
            <FormItemWrapper name="category" label="Category">
              <SelectWrapper options={categoriesOptions} />
            </FormItemWrapper>
            <FormItemWrapper name="tags" label="Tags">
              <SelectWrapper tokenSeparators={[',']} showArrow={false} mode="tags" />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper>
            <SpaceWrapper>
              <ButtonWrapper type="primary" htmlType="submit">
                Save
              </ButtonWrapper>
              <ButtonWrapper>Cancel</ButtonWrapper>
            </SpaceWrapper>
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={PRODUCT_LIST_ROUTE} hideTitle />
}

export default ProductManageComp
