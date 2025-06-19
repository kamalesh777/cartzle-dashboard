import React from 'react'

import { PlusOutlined } from '@ant-design/icons'

import { Form, type FormInstance } from 'antd'

import { ButtonWrapper, CardWrapper } from '@/components/Wrapper'

import VariantFields from './VariantFields'

interface PropTypes {
  form: FormInstance
}

/** Variant card component */
const VariantCardComp = ({ form }: PropTypes): JSX.Element => {
  return (
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
          {fields.map((field, index) => (
            <VariantFields key={index} field={field} remove={remove} form={form} />
          ))}
        </CardWrapper>
      )}
    </Form.List>
  )
}

export default VariantCardComp
