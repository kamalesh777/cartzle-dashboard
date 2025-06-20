import React, { useEffect } from 'react'

import { PlusOutlined } from '@ant-design/icons'

import { Form, type FormInstance } from 'antd'

import { startCase } from 'lodash'

import type { VariantOptionTypes } from '../types'

import { ButtonWrapper, CardWrapper, EmptyWrapper, FormItemWrapper, SelectWrapper, SpaceWrapper } from '@/components/Wrapper'

import VariantFields from './VariantFields'

interface PropTypes {
  form: FormInstance
}

/** Variant card component */
const VariantCardComp = ({ form }: PropTypes): JSX.Element => {
  const variantArr = Form.useWatch('variants', form)
  const initialGroupBy = variantArr?.at(0)?.op_name

  useEffect(() => {
    form.setFieldsValue({
      group_by: initialGroupBy,
    })
  }, [form, initialGroupBy, variantArr])

  return (
    <>
      <Form.List name="variants">
        {(fields, { add, remove }) => (
          <CardWrapper
            title={
              <div className="d-flex justify-content-between align-items-center">
                Variants
                <ButtonWrapper onClick={() => add()} icon={<PlusOutlined />} type="link" className="p-0">
                  Add Variant
                </ButtonWrapper>
              </div>
            }
          >
            {fields?.length > 0 ? (
              fields.map((field, index) => <VariantFields key={index} field={field} remove={remove} form={form} />)
            ) : (
              <EmptyWrapper onClick={() => add()} entity="variants" />
            )}
          </CardWrapper>
        )}
      </Form.List>
      {/* Group By variant */}
      {variantArr?.length > 0 && (
        <CardWrapper bodyStyle={{ padding: '15px 20px' }}>
          <SpaceWrapper size={16} align="center">
            <span>Group By: </span>
            <FormItemWrapper name="group_by" className="mb-0">
              <SelectWrapper
                style={{ width: '200px' }}
                defaultActiveFirstOption
                options={variantArr?.map((variant: VariantOptionTypes) => ({
                  label: startCase(variant?.op_name),
                  value: variant?.op_name,
                }))}
              />
            </FormItemWrapper>
          </SpaceWrapper>
        </CardWrapper>
      )}{' '}
    </>
  )
}

export default VariantCardComp
