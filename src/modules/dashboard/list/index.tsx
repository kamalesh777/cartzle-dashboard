'use client'
import React, { useEffect } from 'react'

import { Col, Row } from 'antd'

import type { IconProps } from '@/components/Wrapper/IconWrapper'

import { CardWrapper } from '@/components/Wrapper'
// eslint-disable-next-line no-duplicate-imports
import IconWrapper from '@/components/Wrapper/IconWrapper'

import { useGetRequestHandler } from '@/hook/requestHandler'

import { data } from '../static/data'

const DashboardComponent = (): JSX.Element => {
  const { fetchData } = useGetRequestHandler()

  // fetch data from api
  useEffect(() => {
    fetchData('/api/api-testing?hello=world')
  }, [])

  return (
    <Row gutter={16}>
      {data?.map(item => (
        <Col span={12} md={6} key={item?.title} className="mb-3">
          <CardWrapper>
            <IconWrapper name={item.icon as IconProps['name']} className="lucide-icon-3" strokeWidth={2} />
            <p className="fw-bold">{item?.title}</p>
          </CardWrapper>
        </Col>
      ))}
    </Row>
  )
}

export default DashboardComponent
