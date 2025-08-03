import React from 'react'

import { Card, type CardProps } from 'antd'

interface CardWrapperProps extends CardProps {
  bottomBorder?: boolean
}

const CardWrapper: React.FC<CardWrapperProps> = props => {
  return (
    <Card {...props} className={`${props.className} ${props.bottomBorder ? 'bottom-border-none' : ''}`}>
      {props.children}
    </Card>
  )
}

export default CardWrapper
