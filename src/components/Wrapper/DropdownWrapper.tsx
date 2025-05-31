import React from 'react'

import { Dropdown, type DropdownProps } from 'antd'

interface CustomDropdownProps extends DropdownProps {
  label?: string
}

const DropdownWrapper: React.FC<CustomDropdownProps> = props => {
  return <Dropdown  overlayStyle={{ width: '200px' }} {...props}>{props.children}</Dropdown>
}

export default DropdownWrapper
