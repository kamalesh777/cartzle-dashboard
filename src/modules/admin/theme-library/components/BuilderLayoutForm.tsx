import React from 'react'

import { Row } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import { ColWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'

interface PropTypes {
  form: FormInstance
}

const BuilderLayoutForm = ({ form }: PropTypes): JSX.Element => {
  return (
    <div className="builder-layout-form">
      <Row>
        <ColWrapper span={4}>
          <FormWrapper form={form}>
            <FormItemWrapper name="title">
              <InputWrapper />
            </FormItemWrapper>
          </FormWrapper>
        </ColWrapper>
        <ColWrapper span={18} />
      </Row>
    </div>
  )
}

export default BuilderLayoutForm
