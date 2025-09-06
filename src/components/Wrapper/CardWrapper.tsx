import React from 'react'

import { Card, type CardProps } from 'antd'

interface CardWrapperProps extends CardProps {
  bottomBorderNone?: boolean
}

const CardWrapper = (props: CardWrapperProps): JSX.Element => {
  return (
    <Card {...props} className={`${props.className} ${props.bottomBorderNone ? 'bottom-border-none' : ''}`}>
      {props.children}
    </Card>
  )
}

export default CardWrapper
