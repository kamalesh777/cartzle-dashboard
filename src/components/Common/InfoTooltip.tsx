import React from 'react'

import { Info } from 'lucide-react'

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
        {props?.icon || <Info className="text-primary" />}
      </SpaceWrapper>
    </TooltipWrapper>
  )
}

export default InfoTooltip
