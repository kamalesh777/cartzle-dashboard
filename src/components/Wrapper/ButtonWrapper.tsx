import React from 'react'

import { Button, Tooltip } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { ButtonProps } from 'antd'

interface CustomButtonProps extends ButtonProps {
  label?: string
  tooltip?: string
  noStyle?: boolean
}

const ButtonWrapper: React.FC<CustomButtonProps> = props => {
  const className = props?.className || ''
  const additionalClassName = props.noStyle ? 'no-style' : ''
  return (
    <>
      {props.tooltip ? (
        <Tooltip title={props.tooltip}>
          <Button className={className + additionalClassName} {...props}>
            {props.children}
          </Button>
        </Tooltip>
      ) : (
        <Button className={className + additionalClassName} {...props}>
          {props.children}
        </Button>
      )}
    </>
  )
}

export default ButtonWrapper
