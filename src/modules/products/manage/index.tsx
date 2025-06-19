/* eslint-disable no-console */
import React, { useEffect } from 'react'

import { FileImageOutlined } from '@ant-design/icons'
import { Form, Input, Row, Upload } from 'antd'

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
  EMPTY_PLACEHOLDER,
  PRODUCT_LIST_ROUTE,
  requiredFieldRules,
  requiredWithWhitspcFieldRules,
} from '@/constants/AppConstant'
import { getCurrency, getProfitMargin } from '@/utils/currency'

import VariantCardComp from './Components/VariantCard'

// Product manage component
const ProductManageComp = (): JSX.Element => {
  const [form] = Form.useForm()
  const isRawMaterial = Form.useWatch('category', form) === 'raw'
  const costPrice = Form.useWatch('cost_price', form)
  const salePrice = Form.useWatch('sale_price', form)

  // Set profit and margin on cost price and sale price change
  useEffect(() => {
    if (salePrice > costPrice) {
      form.setFieldsValue({
        profit: getProfitMargin(costPrice, salePrice, 'profit'),
        margin: getProfitMargin(costPrice, salePrice, 'margin'),
      })
    } else {
      form.setFieldsValue({
        profit: EMPTY_PLACEHOLDER,
        margin: EMPTY_PLACEHOLDER,
      })
    }
  }, [costPrice, salePrice, form])

  /** Form submit handler
   * @param formValue - Form values
   * @returns void
   * @description This function is called when the form is submitted
   */
  const formSubmitHandler = async (formValue: ProductFormValueTypes): Promise<void> => {
    console.log('===formValue', formValue)
  }
  console.log('===isRawMaterial', isRawMaterial)

  /** Common fields for raw and finished products */
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
  /** Main component */
  const MAIN_COMP = (
    <>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler} initialValues={{ category: 'raw' }}>
        <Row gutter={COMMON_ROW_GUTTER} justify={'space-between'}>
          {/* Left side fields */}
          <ColWrapper md={15}>
            <CardWrapper className="mb-3">
              <FormItemWrapper name="title" label="Title" rules={requiredWithWhitspcFieldRules}>
                <InputWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="description" label="Description">
                <Input.TextArea rows={3} />
              </FormItemWrapper>

              <FormItemWrapper name="media" label="Media">
                <Upload.Dragger>
                  <p className="fs-1">
                    <FileImageOutlined className="text-secondary" />
                  </p>
                  <p>Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint mb-3 fs-7">Only Accept images are .jpeg, .jpg, .png, .webp, .svg</p>
                </Upload.Dragger>
              </FormItemWrapper>
            </CardWrapper>
            <CardWrapper title={'Pricing'} className="mb-3">
              <Row gutter={COMMON_ROW_GUTTER}>
                <ColWrapper md={12}>
                  <FormItemWrapper name="cost_price" label="Cost Price" rules={requiredFieldRules}>
                    <InputNumberWrapper prefix={getCurrency()} />
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
                          return Promise.reject(new Error('Sale price must be > Cost price!'))
                        },
                      }),
                    ]}
                  >
                    <InputNumberWrapper prefix={getCurrency()} />
                  </FormItemWrapper>
                </ColWrapper>
                <ColWrapper md={12}>
                  <FormItemWrapper name="profit" label="Profit" rules={requiredFieldRules}>
                    <InputWrapper readOnly />
                  </FormItemWrapper>
                </ColWrapper>
                <ColWrapper md={12}>
                  <FormItemWrapper name="margin" label="Margin" rules={requiredFieldRules}>
                    <InputNumberWrapper formatter={value => (value ? value + '%' : '')} readOnly />
                  </FormItemWrapper>
                </ColWrapper>
              </Row>
            </CardWrapper>
            <VariantCardComp form={form} />
          </ColWrapper>

          {/* Right side fields */}
          <ColWrapper md={9}>
            <CardWrapper title={'Product organization'}>
              <FormItemWrapper name="party" label="Party's Name">
                <SelectWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="type" label="Type">
                <SelectWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="category" label="Category">
                <SelectWrapper options={categoriesOptions} />
              </FormItemWrapper>
              <FormItemWrapper name="tags" label="Tags">
                <SelectWrapper tokenSeparators={[',']} showArrow={false} mode="tags" />
              </FormItemWrapper>
            </CardWrapper>
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
    </>
  )
  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={PRODUCT_LIST_ROUTE} hideTitle />
}

export default ProductManageComp
