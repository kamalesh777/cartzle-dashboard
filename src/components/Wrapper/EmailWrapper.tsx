import React from 'react'

import { type InputProps } from 'antd'

import InputWrapper from './InputWrapper'

const EmailWrapper = (props: InputProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restProps } = props
  return (
    <InputWrapper
      pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
      {...restProps}
    />
  )
}

export default EmailWrapper
