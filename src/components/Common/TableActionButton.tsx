import React from 'react'

import type { DropdownProps, MenuProps } from 'antd'

import { TooltipWrapper } from '../Wrapper'
import DropdownWrapper from '../Wrapper/DropdownWrapper'
import MoreVertical from './Icons/MoreVertical'

interface PropTypes extends DropdownProps {
  items: MenuProps['items']
  icon?: React.ReactNode
  tooltipTitle?: string
  onClick?: () => void
}

const TableActionButton: React.FC<PropTypes> = (props): JSX.Element => {
  const { items, icon, tooltipTitle, onClick, ...restProps } = props

  const deleteIndex = items?.findIndex(item => item?.key === 'delete') as number

  // if (deleteIndex !== -1) {
  //   items[deleteIndex].icon = <DeleteOutlined />
  // }

  // add a object before deleteIndex
  if (deleteIndex !== -1) {
    items?.splice(deleteIndex, 0, {
      type: 'divider',
    })
  }

  return (
    <DropdownWrapper menu={{ items, onClick }} trigger={['click']} {...restProps}>
      <span className="ellipsis-vertical">
        <TooltipWrapper title={tooltipTitle ?? ''}>{icon || <MoreVertical />}</TooltipWrapper>
      </span>
    </DropdownWrapper>
  )
}

export default TableActionButton
