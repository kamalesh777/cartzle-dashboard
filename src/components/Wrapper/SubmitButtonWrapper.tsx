import React from 'react'

import { type ButtonProps } from 'antd'

import ButtonWrapper from './ButtonWrapper'
import SpaceWrapper from './SpaceWrapper'

interface propTypes extends ButtonProps {
  okText?: React.ReactNode | string
  cancelText?: React.ReactNode | string
  cancelButtonProps?: ButtonProps
  okButtonProps?: ButtonProps
  spaceClassName?: string
}

const SubmitButtonWrapper = ({
  okText,
  cancelText,
  cancelButtonProps,
  okButtonProps,
  spaceClassName,
}: propTypes): JSX.Element => {
  return (
    <SpaceWrapper className={spaceClassName}>
      <ButtonWrapper
        htmlType={okButtonProps?.htmlType || 'submit'}
        type="primary"
        loading={okButtonProps?.loading}
        {...okButtonProps}
      >
        {okText || 'Save'}
      </ButtonWrapper>
      <ButtonWrapper {...cancelButtonProps}>{cancelText || 'Cancel'}</ButtonWrapper>
    </SpaceWrapper>
  )
}

export default SubmitButtonWrapper
