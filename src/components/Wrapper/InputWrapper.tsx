import { Input } from 'antd'
import React from 'react'

import type { InputProps } from 'antd'

const InputWrapper: React.FC<InputProps> = props => {
  return <Input {...props} />
}

export default InputWrapper
