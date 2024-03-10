import React from 'react'

import { type InputProps } from 'antd'

import InputWrapper from './InputWrapper'

const MobileInputWrapper = (props: InputProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restProps } = props
  return (
    <InputWrapper
      maxLength={15}
      onKeyPress={event => {
        if (!event.code.startsWith('Digit')) {
          event.preventDefault()
        }
      }}
      {...restProps}
    />
  )
}

export default MobileInputWrapper
