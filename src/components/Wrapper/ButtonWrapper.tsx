import React from 'react'

import { Button } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { ButtonProps } from 'antd'

interface CustomButtonProps extends ButtonProps {
  label?: string
}

const ButtonWrapper: React.FC<CustomButtonProps> = props => {
  return <Button {...props}>{props.children}</Button>
}

export default ButtonWrapper
