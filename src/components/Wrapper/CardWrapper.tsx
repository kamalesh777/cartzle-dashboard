import React from 'react'

import { Card, type CardProps } from 'antd'

const CardWrapper: React.FC<CardProps> = props => {
  return <Card {...props}>{props.children}</Card>
}

export default CardWrapper
