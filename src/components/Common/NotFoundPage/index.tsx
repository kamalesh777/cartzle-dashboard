import React from 'react'

import { Card, Divider } from 'antd'

import { SpaceWrapper } from '@/components/Wrapper'

interface cardProps {
  height?: string
  message: string
  status?: number
}
const NotFoundPage = ({ height, message, status = 404 }: cardProps): JSX.Element => (
  <Card className="d-flex align-items-center justify-content-center rounded-0" style={{ height: height || '150px' }}>
    <div className="container">
      <SpaceWrapper size={16}>
        <h2>{status}</h2>
        <Divider type="vertical" style={{ height: '80px', borderColor: '#ccc' }} />
        <h3 className="m-0">{message}</h3>
      </SpaceWrapper>
    </div>
  </Card>
)

export default NotFoundPage
