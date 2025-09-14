import React from 'react'

import { Collapse, Row, theme } from 'antd'

import type { LayoutCardTypes } from '../types'

import { CardWrapper, ColWrapper, SpaceWrapper, TagWrapper } from '@/components/Wrapper'
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { layoutConfigArray } from '../static/layout-card'

const LayoutCardComp = (): JSX.Element => {
  // theme color
  const { token } = theme.useToken()

  // render children function
  const renderChildren = (children: LayoutCardTypes[]): JSX.Element => {
    return (
      <Row gutter={8}>
        {children?.map(item => (
          <ColWrapper span={8} key={item.key}>
            <CardWrapper key={item.key} size="small" className="mb-2">
              <div className="w-100 d-flex justify-content-between align-items-center">
                <p>{item.label}</p>
                <IconWrapper className="primary-color" name={'plus' as IconProps['name']} />
              </div>
            </CardWrapper>
          </ColWrapper>
        ))}
      </Row>
    )
  }
  return (
    <Row gutter={COMMON_ROW_GUTTER}>
      <ColWrapper span={10} />
      <ColWrapper span={14}>
        {layoutConfigArray.map(obj => (
          <Collapse
            key={obj.key}
            expandIconPosition="end"
            className="mb-2"
            bordered={false}
            items={[
              {
                key: obj.key,
                label: (
                  <div className="d-flex justify-content-between">
                    <SpaceWrapper>
                      <IconWrapper name={obj.icon as IconProps['name']} />
                      <span className="fw-semibold">{obj.label}</span>
                    </SpaceWrapper>
                    {obj?.children && obj?.children?.length > 0 && (
                      <TagWrapper color={token.colorPrimary}>{obj.children?.length} Variants </TagWrapper>
                    )}
                  </div>
                ),
                children: renderChildren(obj?.children || []),
              },
            ]}
          />
        ))}
      </ColWrapper>
    </Row>
  )
}

export default LayoutCardComp
