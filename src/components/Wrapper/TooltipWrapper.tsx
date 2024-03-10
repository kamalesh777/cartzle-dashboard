import React from 'react'

import { Tooltip, type TooltipProps } from 'antd'

const TooltipWrapper: React.FC<TooltipProps> = props => {
  return <Tooltip {...props}>{props.children}</Tooltip>
}

export default TooltipWrapper
