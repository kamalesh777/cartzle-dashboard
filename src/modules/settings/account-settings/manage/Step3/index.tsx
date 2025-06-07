import React from 'react'

import { CheckCircleOutlined } from '@ant-design/icons'

import { ButtonWrapper } from '@/components/Wrapper'

const Step3Contengt = (): JSX.Element => {
  return (
    <div className=" p-4 rounded-3 text-center">
      <CheckCircleOutlined style={{ fontSize: '70px' }} className="success-color" />
      {/* <Progress percent={30} type="line" /> */}
      <h2 className="mt-2">Successfully Build</h2>
      <p>Your workspace is ready click on the below link to login!</p>
      <ButtonWrapper className="mt-4" type="primary">
        Go Now
      </ButtonWrapper>
    </div>
  )
}

export default Step3Contengt
