import { Button } from 'antd'
import React from 'react'

import type { ButtonProps } from 'antd'

interface CustomButtonProps extends ButtonProps {
  label?: string
}

const ButtonWrapper: React.FC<CustomButtonProps> = props => {
  return <Button {...props}>{props.children}</Button>
}

export default ButtonWrapper
