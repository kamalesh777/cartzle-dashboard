/* eslint-disable no-console */
import React from 'react'

import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons'
import { Form, Radio, Row } from 'antd'

import { useParams } from 'next/navigation'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import {
  CardWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  SelectWrapper,
  ColWrapper,
  ButtonWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'
import DatePickerWrapper from '@/components/Wrapper/DatePickerWrapper'
import {
  categoriesOptions,
  COMMON_ROW_GUTTER,
  MeasurementOptions,
  ORDER_LIST_ROUTE,
  requiredFieldRules,
  requiredWithWhitspcFieldRules,
} from '@/constants/AppConstant'
import { getCardTitle } from '@/utils/commonFunctions'

// main function
const OrderManageComp = (): JSX.Element => {
  const params = useParams()
  const cardTitle = `${getCardTitle(params)} Detais`

  const [form] = Form.useForm()
  const isRawMaterial = Form.useWatch('category', form) === 'raw'

  const formSubmitHandler = async (formValue: any): Promise<void> => {
    console.log('===formValue', formValue)
  }
  console.log('===isRawMaterial', isRawMaterial)

  const formInitialValues = {
    type: 'purchase',
    product_items: [
      {
        product_id: '',
        qty: '',
        price: '',
      },
    ],
  }

  const MAIN_COMP = (
    <CardWrapper title={cardTitle}>
      <Form layout="vertical" form={form} onFinish={formSubmitHandler} initialValues={formInitialValues}>
        <Row gutter={COMMON_ROW_GUTTER}>
          <ColWrapper md={12}>
            <FormItemWrapper name="party_id" label="Party's Name" rules={requiredWithWhitspcFieldRules}>
              <SelectWrapper />
            </FormItemWrapper>
          </ColWrapper>
          <ColWrapper md={12}>
            <FormItemWrapper name="date" label="Date" rules={requiredWithWhitspcFieldRules}>
              <DatePickerWrapper className="w-100" />
            </FormItemWrapper>
          </ColWrapper>
        </Row>
        <Row>
          <ColWrapper md="24">
            <Form.List name="product_items">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map(field => (
                    <CardWrapper
                      className="mb-3"
                      size="small"
                      title={`Item ${field.name + 1}`}
                      key={field.key}
                      extra={
                        fields?.length > 1 ? (
                          <CloseCircleFilled
                            onClick={() => {
                              remove(field.name)
                            }}
                          />
                        ) : null
                      }
                    >
                      <Row gutter={COMMON_ROW_GUTTER}>
                        <ColWrapper md={8}>
                          <FormItemWrapper name={[field.name, 'product_id']} label="Product Name" rules={requiredFieldRules}>
                            <SelectWrapper className="w-100" />
                          </FormItemWrapper>
                        </ColWrapper>
                        <ColWrapper md={8}>
                          <FormItemWrapper name={[field.name, 'qty']} label="Qty" rules={requiredFieldRules}>
                            <InputNumberWrapper />
                          </FormItemWrapper>
                        </ColWrapper>
                        <ColWrapper md={8}>
                          <FormItemWrapper name={[field.name, 'price']} label="Price" rules={requiredFieldRules}>
                            <InputNumberWrapper />
                          </FormItemWrapper>
                        </ColWrapper>
                      </Row>
                    </CardWrapper>
                  ))}
                  <FormItemWrapper className="mt-3">
                    <ButtonWrapper type="dashed" className="text-primary" onClick={() => add()} icon={<PlusOutlined />}>
                      Add more items
                    </ButtonWrapper>
                    <Form.ErrorList errors={errors} />
                  </FormItemWrapper>
                </>
              )}
            </Form.List>
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
              <FormItemWrapper name="party" label="Party's Name" rules={requiredWithWhitspcFieldRules}>
                <SelectWrapper />
              </FormItemWrapper>
            </ColWrapper>
          </Row>
        )}
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

  return <DynamicPageLayout MainComp={MAIN_COMP} goBackUrl={`${ORDER_LIST_ROUTE}/${params?.type}`} hideTitle />
}

export default OrderManageComp
