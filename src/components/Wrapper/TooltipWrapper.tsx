import { Tooltip } from 'antd'
import React from 'react'

import type { TooltipProps } from 'antd'

const TooltipWrapper: React.FC<TooltipProps> = props => {
  return <Tooltip {...props}>{props.children}</Tooltip>
}

export default TooltipWrapper
