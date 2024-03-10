import { Card } from 'antd'
import React from 'react'

import type { CardProps } from 'antd'

const CardWrapper: React.FC<CardProps> = props => {
  return <Card {...props}>{props.children}</Card>
}

export default CardWrapper
