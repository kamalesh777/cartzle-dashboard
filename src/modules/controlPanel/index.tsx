import React from 'react'

import { Col, Row } from 'antd'

import Link from 'next/link'

import { CardWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

const ControlPanelComp = (): JSX.Element => {
  const controlOptions = [
    {
      label: 'Users',
      value: '/control-panel/users',
    },
    {
      label: 'Woods',
      value: '/woods',
    },
  ]
  return (
    <Row gutter={16}>
      {controlOptions?.map(obj => (
        <Col span={12} md={6} key={obj.value}>
          <Link href={CONTROL_PANEL_ROUTE + obj?.value}>
            <CardWrapper>{obj?.label}</CardWrapper>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default ControlPanelComp
