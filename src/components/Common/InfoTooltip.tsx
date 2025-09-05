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
      <SpaceWrapper size={6}>
        {props?.children}
        {props?.icon || <Info className="text-primary mt-1" />}
      </SpaceWrapper>
    </TooltipWrapper>
  )
}

export default InfoTooltip
