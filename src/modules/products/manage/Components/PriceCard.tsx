import React, { useEffect } from 'react'

import { Form, Row } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import { CardWrapper, ColWrapper, FormItemWrapper, InputNumberWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, EMPTY_PLACEHOLDER, requiredFieldRules } from '@/constants/AppConstant'
import { getCurrency, getProfitDiscount } from '@/utils/currency'

interface PropTypes {
  form: FormInstance
  entity?: 'variants'
}

const PriceCard = ({ form, entity }: PropTypes): JSX.Element => {
  const costPrice = Form.useWatch('costPrice', form)
  const salePrice = Form.useWatch('salePrice', form)
  const discount = Form.useWatch('discount', form) ?? 0

  // Set profit and margin on cost price and sale price change
  useEffect(() => {
    if (salePrice > costPrice) {
      form.setFieldsValue({
        profit: getProfitDiscount(costPrice, salePrice, discount, 'profit'),
      })
    } else {
      form.setFieldsValue({
        profit: EMPTY_PLACEHOLDER,
        discount: 0,
      })
    }
  }, [costPrice, salePrice, discount, form])

  const renderFormFields = (): JSX.Element => {
    return (
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
                  if (!value || value >= getFieldValue('costPrice')) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Sale price < Cost price'))
                },
              }),
            ]}
          >
            <InputNumberWrapper prefix={getCurrency()} />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="discount" label="Discount" className="mb-2">
            <InputNumberWrapper suffix={'%'} />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="profit" label="Profit" className="mb-2">
            <InputNumberWrapper readOnly prefix={getCurrency()} />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    )
  }
  return entity === 'variants' ? (
    renderFormFields()
  ) : (
    <CardWrapper title={'Pricing'} className="mb-3" bottomBorderNone>
      {renderFormFields()}
    </CardWrapper>
  )
}

export default PriceCard
