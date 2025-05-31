import React from 'react'

import ButtonWrapper from './ButtonWrapper'
import { ButtonProps } from 'antd'

interface propTypes extends ButtonProps{
  loading: boolean
  children?: React.ReactNode
}

const SubmitButtonWrapper = ({ loading = false, children, ...restProps }: propTypes): JSX.Element => {
  return (
    <ButtonWrapper loading={loading} htmlType="submit" type="primary" {...restProps}>
      {children || 'Save'}
    </ButtonWrapper>
  )
}

export default SubmitButtonWrapper
