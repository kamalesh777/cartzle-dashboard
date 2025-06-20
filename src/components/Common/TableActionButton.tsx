import React from 'react'

import { MenuOutlined } from '@ant-design/icons'

import type { DropdownProps, MenuProps } from 'antd'

import { TooltipWrapper } from '../Wrapper'
import DropdownWrapper from '../Wrapper/DropdownWrapper'

interface PropTypes extends DropdownProps {
  items: MenuProps['items']
}

const TableActionButton: React.FC<PropTypes> = (props): JSX.Element => {
  const { items, ...restProps } = props
  return (
    <DropdownWrapper menu={{ items }} trigger={['click']} {...restProps}>
      <TooltipWrapper title="Action">
        <MenuOutlined style={{ fontSize: '12px' }} />
      </TooltipWrapper>
    </DropdownWrapper>
  )
}

export default TableActionButton
