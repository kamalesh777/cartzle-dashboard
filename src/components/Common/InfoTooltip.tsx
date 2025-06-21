import React from 'react'

import { InfoCircleOutlined } from '@ant-design/icons'

import type { TooltipProps } from 'antd'

import { SpaceWrapper, TooltipWrapper } from '../Wrapper'

const InfoTooltip: React.FC<TooltipProps> = (props): JSX.Element => {
  return (
    <TooltipWrapper {...props}>
      <SpaceWrapper>
        {props?.children}
        <InfoCircleOutlined className="text-primary" />
      </SpaceWrapper>
    </TooltipWrapper>
  )
}

export default InfoTooltip
