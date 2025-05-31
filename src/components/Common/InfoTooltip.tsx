import React from 'react'

import { InfoCircleOutlined } from '@ant-design/icons'

import type { TooltipProps } from 'antd'

import { TooltipWrapper } from '../Wrapper'

const InfoTooltip: React.FC<TooltipProps> = (props): JSX.Element => {
  return (
    <TooltipWrapper {...props}>
      <InfoCircleOutlined className="text-primary" />
    </TooltipWrapper>
  )
}

export default InfoTooltip
