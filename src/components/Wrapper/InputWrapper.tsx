import React from 'react'

import { Input, type InputProps } from 'antd'

const InputWrapper: React.FC<InputProps> = props => {
  return <Input {...props} />
}

export default InputWrapper
