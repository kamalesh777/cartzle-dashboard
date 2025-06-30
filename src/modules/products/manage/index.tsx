/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'

import { Form, Input, Row } from 'antd'

import type { ProductFormValueTypes } from '../types'

import type { CategoryType } from './types'

import { getRequest } from '@/api/preference/RequestService'
import { InfoTooltip } from '@/components/Common'
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
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import {
  COMMON_ROW_GUTTER,
  EMPTY_PLACEHOLDER,
  PRODUCT_LIST_ROUTE,
  requiredFieldRules,
  requiredWithWhitspcFieldRules,
} from '@/constants/AppConstant'

import { getCurrency, getProfitMargin } from '@/utils/currency'

import { getSelectOption } from '@/utils/disableFunction'

import VariantCardComp from './Components/VariantCard'
import VariantsTable from './Components/VariantsTable'

// Product manage component
const ProductManageComp = (): JSX.Element => {
  const [form] = Form.useForm()
  const costPrice = Form.useWatch('costPrice', form)
  const salePrice = Form.useWatch('salePrice', form)

  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([])
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

  // fetch category
  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      try {
        const res = await getRequest('/api/category-list')
        if (res.data.success) {
          setCategoriesData(res.data.result)
        }
      } catch (error) {
        console.log('===error', error)
      }
    }
    fetchCategory()
  }, [])

  /** Form submit handler
   * @param formValue - Form values
   * @returns void
   * @description This function is called when the form is submitted
   */
  const formSubmitHandler = async (formValue: ProductFormValueTypes): Promise<void> => {
    const payload = {
      ...formValue,
    }
    console.log('===formValue', payload)
  }

  /** Main component */
  const MAIN_COMP = (
    <>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler}>
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
              <FormItemWrapper name="category" label="Category">
                <SelectWrapper options={getSelectOption(categoriesData, ['name', 'id'])} />
              </FormItemWrapper>
              <FormItemWrapper name="media" label="Media">
                <UploadWrapper />
              </FormItemWrapper>
            </CardWrapper>
            <CardWrapper title={'Pricing'} className="mb-3">
              <Row gutter={COMMON_ROW_GUTTER}>
                <ColWrapper md={12}>
                  <FormItemWrapper name="costPrice" label="Cost Price" rules={requiredFieldRules}>
                    <InputNumberWrapper prefix={getCurrency()} />
                  </FormItemWrapper>
                </ColWrapper>
                <ColWrapper md={12}>
                  <FormItemWrapper
                    name="salePrice"
                    label="Sale Price"
                    dependencies={['costPrice']}
                    rules={[
                      ...requiredFieldRules,
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || value > getFieldValue('costPrice')) {
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
                  <FormItemWrapper name="profit" label="Profit" className="mb-2">
                    <InputWrapper readOnly />
                  </FormItemWrapper>
                </ColWrapper>
                <ColWrapper md={12}>
                  <FormItemWrapper name="margin" label="Margin" className="mb-2">
                    <InputNumberWrapper
                      formatter={value => (value !== EMPTY_PLACEHOLDER ? value + '%' : EMPTY_PLACEHOLDER)}
                      readOnly
                    />
                  </FormItemWrapper>
                </ColWrapper>
              </Row>
            </CardWrapper>
            <VariantCardComp form={form} />
            {/* Variants table */}
            <VariantsTable form={form} />
          </ColWrapper>

          {/* Right side fields */}
          <ColWrapper md={9}>
            <CardWrapper title={'Publishing'} className="mb-3">
              <FormItemWrapper name="status" label="Status">
                <SelectWrapper options={getSelectOption(['Active', 'Inactive'])} />
              </FormItemWrapper>
              <FormItemWrapper
                name="showcase"
                label={
                  <SpaceWrapper>
                    Showcase
                    <InfoTooltip title="Select a page where this product will be shown" />
                  </SpaceWrapper>
                }
              >
                <SelectWrapper />
              </FormItemWrapper>
              <FormItemWrapper
                name="collection"
                label={
                  <SpaceWrapper>
                    Collection
                    <InfoTooltip title="Select a section where this product will be shown" />
                  </SpaceWrapper>
                }
              >
                <SelectWrapper />
              </FormItemWrapper>
            </CardWrapper>
            <CardWrapper title={'Product organization'}>
              <FormItemWrapper name="brand" label="Brand">
                <SelectWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="party" label="Party's Name">
                <SelectWrapper />
              </FormItemWrapper>
              <FormItemWrapper name="type" label="Type">
                <SelectWrapper />
              </FormItemWrapper>

              <FormItemWrapper name="tags" label="Tags">
                <SelectWrapper tokenSeparators={[',']} showArrow={false} mode="tags" />
              </FormItemWrapper>
            </CardWrapper>
          </ColWrapper>
        </Row>
        <Row gutter={COMMON_ROW_GUTTER} className="mt-3">
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
