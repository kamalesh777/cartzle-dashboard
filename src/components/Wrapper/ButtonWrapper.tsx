import React from 'react'

import { Button, Tooltip } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { ButtonProps } from 'antd'

interface CustomButtonProps extends ButtonProps {
  label?: string
  tooltip?: string
}

const ButtonWrapper: React.FC<CustomButtonProps> = props => {
  return props.tooltip ? (
    <Tooltip title={props.tooltip}>
      <Button {...props}>{props.children}</Button>
    </Tooltip>
  ) : (
    <Button {...props}>{props.children}</Button>
  )
}

export default ButtonWrapper
