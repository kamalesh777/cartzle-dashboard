import React from 'react'

import { InputNumber, type InputNumberProps } from 'antd'

const InputNumberWrapper = (props: InputNumberProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restProps } = props
  return <InputNumber controls={false} className={`w-100 ${props.className}`} {...restProps} />
}

export default InputNumberWrapper
