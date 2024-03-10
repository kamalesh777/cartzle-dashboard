import { Dropdown } from 'antd'
import React from 'react'

import type { DropdownProps } from 'antd'

interface CustomDropdownProps extends DropdownProps {
  label?: string
}

const DropdownWrapper: React.FC<CustomDropdownProps> = props => {
  return <Dropdown {...props}>{props.children}</Dropdown>
}

export default DropdownWrapper
