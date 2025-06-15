import React, { useEffect } from 'react'

import { Col, Row } from 'antd'

import { CardWrapper } from '@/components/Wrapper'
import IconWrapper from '@/components/Wrapper/IconWrapper'

import { useGetRequestHandler } from '@/hook/requestHandler'

import { data } from '../static/data'

const DashboardComponent = (): JSX.Element => {
  const { fetchData } = useGetRequestHandler()
  useEffect(() => {
    fetchData('/api/api-testing?hello=world')
  }, [])

  return (
    <Row gutter={16}>
      {data?.map(item => (
        <Col span={12} md={6} key={item?.title} className="mb-3">
          <CardWrapper>
            <IconWrapper icon={item.icon} style={{ fontSize: '32px' }} />
            <h2>{item?.title}</h2>
          </CardWrapper>
        </Col>
      ))}
    </Row>
  )
}

export default DashboardComponent
