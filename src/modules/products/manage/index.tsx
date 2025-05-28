import React from 'react'

import { Form, Row } from 'antd'

import { useParams } from 'next/navigation'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { CardWrapper, FormItemWrapper, InputNumberWrapper, InputWrapper, SelectWrapper } from '@/components/Wrapper'
import ColWrapper from '@/components/Wrapper/ColWrapper'
import { COMMON_ROW_GUTTER, PRODUCT_LIST_ROUTE, reqWithWhitspcFieldRules } from '@/constants/AppConstant'
import { getCardTitle } from '@/utils/commonFunctions'

const ProductManageComp = (): JSX.Element => {
  const params = useParams()
  const cardTitle = `${getCardTitle(params)} Products`

  const MAIN_COMP = (
    <CardWrapper title={cardTitle}>
      <Form layout="vertical">
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="name" label="Product name" rules={reqWithWhitspcFieldRules}>
              <InputWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="category" label="Category" rules={reqWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
        {/* <Row>
          <ColWrapper md="24">
            <FormItemWrapper name="description" label="Product description">
              <Input.TextArea rows={5} />
            </FormItemWrapper>
          </ColWrapper>
        </Row> */}
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={7}>
            <FormItemWrapper name="width" label="Width" rules={reqWithWhitspcFieldRules}>
              <InputNumberWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={7}>
            <FormItemWrapper name="thickness" label="Thickness" rules={reqWithWhitspcFieldRules}>
              <InputNumberWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={7}>
            <FormItemWrapper name="length" label="Length" rules={reqWithWhitspcFieldRules}>
              <InputNumberWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={3}>
            <FormItemWrapper name="unit" label="Unit" rules={reqWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
      </Form>
    </CardWrapper>
  )
  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={PRODUCT_LIST_ROUTE} hideTitle />
}

export default ProductManageComp
