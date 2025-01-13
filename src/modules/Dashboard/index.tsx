import React from 'react'

import { CardWrapper } from '@/components/Wrapper'
import IconWrapper from '@/components/Wrapper/IconWrapper'

import data from './data'

const DashboardComponent = (): JSX.Element => {
  return (
    <div>
      {data?.map(item => (
        <>
          <CardWrapper key={item?.title}>
            <IconWrapper icon="CodeSandboxOutlined" />
            <h2>{item?.title}</h2>
          </CardWrapper>
          <CardWrapper>
            <IconWrapper icon={item.icon} />
            {/* {renderDynamicIcon('HomeOutlined')} */}
            <h2>{item.title}</h2>
          </CardWrapper>
        </>
      ))}
    </div>
  )
}

export default DashboardComponent
