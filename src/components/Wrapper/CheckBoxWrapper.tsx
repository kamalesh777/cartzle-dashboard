import React from 'react'

import { Checkbox, type CheckboxProps } from 'antd'

interface customCheckboxProps extends CheckboxProps {
  label?: string
}

const CheckBoxWrapper: React.FC<customCheckboxProps> = props => {
  return <Checkbox {...props}>{props.children}</Checkbox>
}

export default CheckBoxWrapper
