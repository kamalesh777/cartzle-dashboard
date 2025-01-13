import React from 'react'

import { Col, Row } from 'antd'

import { CardWrapper } from '@/components/Wrapper'
import IconWrapper from '@/components/Wrapper/IconWrapper'

import { data } from './data'

const DashboardComponent = (): JSX.Element => {
  return (
    <Row gutter={16}>
      {data?.map(item => (
        <Col span={12} md={6} key={item?.title} className="mb-3">
          <CardWrapper>
            <IconWrapper icon="CodeSandboxOutlined" />
            <h2>{item?.title}</h2>
          </CardWrapper>
        </Col>
      ))}
    </Row>
  )
}

export default DashboardComponent
