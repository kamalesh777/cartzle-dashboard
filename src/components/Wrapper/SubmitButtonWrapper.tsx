import React from 'react'

import { Space, type ButtonProps } from 'antd'

import ButtonWrapper from './ButtonWrapper'

interface propTypes extends ButtonProps {
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
  cancelButtonProps?: ButtonProps
  okButtonProps?: ButtonProps
}

const SubmitButtonWrapper = ({ okText, cancelText, cancelButtonProps, okButtonProps }: propTypes): JSX.Element => {
  return (
    <Space>
      <ButtonWrapper htmlType="submit" type="primary" loading={okButtonProps?.loading} {...okButtonProps}>
        {okText || 'Save'}
      </ButtonWrapper>
      <ButtonWrapper {...cancelButtonProps}>{cancelText || 'Cancel'}</ButtonWrapper>
    </Space>
  )
}

export default SubmitButtonWrapper
