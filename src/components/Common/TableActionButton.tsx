import React from 'react'

import { HolderOutlined } from '@ant-design/icons'

import type { DropdownProps, MenuProps } from 'antd'

import DropdownWrapper from '../Wrapper/DropdownWrapper'

interface PropTypes extends DropdownProps {
  items: MenuProps['items']
}

const TableActionButton: React.FC<PropTypes> = (props): JSX.Element => {
  const { items, ...restProps } = props
  return (
    <DropdownWrapper menu={{ items }} trigger={['click']} {...restProps}>
      <HolderOutlined />
    </DropdownWrapper>
  )
}

export default TableActionButton
