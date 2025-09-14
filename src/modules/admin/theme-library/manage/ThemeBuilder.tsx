'use client'
import React from 'react'

import { Row, Tabs } from 'antd'

import { CardWrapper, ColWrapper } from '@/components/Wrapper'

// eslint-disable-next-line no-duplicate-imports
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import { tabsArray } from '../static/data'

const ThemeBuilder = (): JSX.Element => {
  return (
    <Row>
      <ColWrapper span={12}>
        <CardWrapper>
          <p />
        </CardWrapper>
      </ColWrapper>
      <ColWrapper span={24}>
        <CardWrapper>
          <Tabs
            centered
            defaultActiveKey="2"
            items={tabsArray.map(obj => {
              return {
                ...obj,
                icon: <IconWrapper name={obj.icon as IconProps['name']} />,
              }
            })}
          />
        </CardWrapper>
      </ColWrapper>
    </Row>
  )
}

export default ThemeBuilder
