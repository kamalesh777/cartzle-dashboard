import React from 'react'

import { InfoCircleOutlined } from '@ant-design/icons'

import type { TooltipPropsWithTitle } from 'antd/es/tooltip'

import { SpaceWrapper, TooltipWrapper } from '../Wrapper'

interface PropTypes extends TooltipPropsWithTitle {
  icon?: React.ReactNode
  children?: React.ReactNode
}

const InfoTooltip: React.FC<PropTypes> = (props): JSX.Element => {
  return (
    <TooltipWrapper {...props}>
      <SpaceWrapper>
        {props?.children}
        {props?.icon || <InfoCircleOutlined className="text-primary" />}
      </SpaceWrapper>
    </TooltipWrapper>
  )
}

export default InfoTooltip
