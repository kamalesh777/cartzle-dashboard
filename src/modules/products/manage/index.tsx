import React from 'react'

import { Form, Input, Radio, Row, Space } from 'antd'

import { useParams } from 'next/navigation'

import type { ProductFormValueTypes } from '../types/product'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import {
  CardWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  InputWrapper,
  SelectWrapper,
  ColWrapper,
  ButtonWrapper,
} from '@/components/Wrapper'
import {
  categoriesOptions,
  COMMON_ROW_GUTTER,
  MeasurementOptions,
  PRODUCT_LIST_ROUTE,
  requiredFieldRules,
  reqWithWhitspcFieldRules,
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
        <FormItemWrapper name="qty" label="Quantity">
          <InputNumberWrapper />
        </FormItemWrapper>
      </ColWrapper>
      <ColWrapper md={12}>
        <FormItemWrapper name="stock_location" label="Stock Location">
          <SelectWrapper />
        </FormItemWrapper>
      </ColWrapper>
    </>
  )
  const MAIN_COMP = (
    <CardWrapper title={cardTitle}>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler} initialValues={{ category: 'raw' }}>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="name" label="Product name" rules={reqWithWhitspcFieldRules}>
              <InputWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="wood_type" label="Wood Type" rules={reqWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
        <Row>
          <ColWrapper md="24">
            <FormItemWrapper name="description" label="Product description">
              <Input.TextArea rows={3} />
            </FormItemWrapper>
          </ColWrapper>
        </Row>

        <Row>
          <ColWrapper>
            <FormItemWrapper name="category" label="Category">
              <Radio.Group options={categoriesOptions} />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
        {isRawMaterial ? (
          <Row gutter={COMMON_ROW_GUTTER}>
            <ColWrapper md={12}>
              <FormItemWrapper name={['width', 'value']} label="Width" rules={requiredFieldRules}>
                <InputNumberWrapper
                  addonAfter={
                    <FormItemWrapper name={['width', 'unit']} initialValue={'in'} noStyle>
                      <SelectWrapper options={MeasurementOptions} />
                    </FormItemWrapper>
                  }
                />
              </FormItemWrapper>
            </ColWrapper>
            <ColWrapper md={12}>
              <FormItemWrapper name={['width', 'value']} label="Thickness" rules={requiredFieldRules}>
                <InputNumberWrapper
                  addonAfter={
                    <FormItemWrapper name={['thickness', 'unit']} initialValue={'in'} noStyle>
                      <SelectWrapper options={MeasurementOptions} />
                    </FormItemWrapper>
                  }
                />
              </FormItemWrapper>
            </ColWrapper>
            <ColWrapper md={12}>
              <FormItemWrapper name={['length', 'value']} label="Length" rules={requiredFieldRules}>
                <InputNumberWrapper
                  addonAfter={
                    <FormItemWrapper name={['length', 'unit']} initialValue={'in'} noStyle>
                      <SelectWrapper options={MeasurementOptions} />
                    </FormItemWrapper>
                  }
                />
              </FormItemWrapper>
            </ColWrapper>
            {/* common quantity and stock location field */}
            {COMMON_FIELDS}
          </Row>
        ) : (
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
            <ColWrapper md={12}>
              <FormItemWrapper name="party" label="Party's Name" rules={reqWithWhitspcFieldRules}>
                <SelectWrapper />
              </FormItemWrapper>
            </ColWrapper>
            {/* common quantity and stock location field */}
            {COMMON_FIELDS}
          </Row>
        )}
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper>
            <Space>
              <ButtonWrapper type="primary" htmlType="submit">
                Save
              </ButtonWrapper>
              <ButtonWrapper>Cancel</ButtonWrapper>
            </Space>
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={PRODUCT_LIST_ROUTE} hideTitle />
}

export default ProductManageComp
