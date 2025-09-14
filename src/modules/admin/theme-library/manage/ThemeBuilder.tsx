'use client'
import React from 'react'

import { Collapse, Row, Tabs } from 'antd'

import { PanelsTopLeft } from 'lucide-react'

import { CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

// eslint-disable-next-line no-duplicate-imports
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import { pagesArray, tabsArray } from '../static/data'

const ThemeBuilder = (): JSX.Element => {
  return (
    <Row>
      {/* panel for config layout */}
      <ColWrapper>
        {pagesArray.map(obj => (
          <Collapse
            key={obj.key}
            // collapsible="header"
            className="mb-3"
            expandIconPosition="end"
            items={[
              {
                key: '1',
                label: (
                  <SpaceWrapper>
                    <PanelsTopLeft className="lucide-icon-1-3" />
                    {obj.label}
                  </SpaceWrapper>
                ),
                classNames: {
                  header: 'bg-white w-100 rounded-2',
                },
                children: <p>{obj.children}</p>,
              },
            ]}
          />
        ))}
      </ColWrapper>

      {/* Page Builder */}
      <ColWrapper span={24}>
        <CardWrapper bottomBorderNone classNames={{ body: 'px-0' }}>
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
