import React from 'react'

import type { DropdownProps, MenuProps } from 'antd'

import { TooltipWrapper } from '../Wrapper'
import DropdownWrapper from '../Wrapper/DropdownWrapper'
import MoreVertical from './Icons/MoreVertical'

interface PropTypes extends DropdownProps {
  items: MenuProps['items']
  icon?: React.ReactNode
  tooltipTitle?: string
}

const TableActionButton: React.FC<PropTypes> = (props): JSX.Element => {
  const { items, icon, tooltipTitle, ...restProps } = props
  return (
    <DropdownWrapper menu={{ items }} trigger={['click']} {...restProps}>
      <TooltipWrapper title={tooltipTitle ?? 'Action'}>{icon || <MoreVertical />}</TooltipWrapper>
    </DropdownWrapper>
  )
}

export default TableActionButton
