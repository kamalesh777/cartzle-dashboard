import React from 'react'

import { CardWrapper } from '@/components/Wrapper'
import IconWrapper from '@/components/Wrapper/IconWrapper'

const DashboardComponent = (): JSX.Element => {
  return (
    <div>
      <CardWrapper>
        <IconWrapper icon="CodeSandboxOutlined" />
        <h2>Hello World</h2>
      </CardWrapper>
      <CardWrapper>
        <IconWrapper icon="HomeOutlined" />
        {/* {renderDynamicIcon('HomeOutlined')} */}
        <h2>Hello Kamalesh</h2>
      </CardWrapper>
    </div>
  )
}

export default DashboardComponent
