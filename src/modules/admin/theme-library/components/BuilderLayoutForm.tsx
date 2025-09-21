import React from 'react'

import { Row } from 'antd'

import { ColWrapper, FormItemWrapper, InputWrapper } from '@/components/Wrapper'
import FormWrapper from '@/components/Wrapper/FormWrapper'

const BuilderLayoutForm = (): JSX.Element => {
  return (
    <div className="builder-layout-form">
      <Row>
        <ColWrapper span={4}>
          <FormWrapper>
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
