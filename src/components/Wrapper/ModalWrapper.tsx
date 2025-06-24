// eslint-disable-next-line import/named
import React from 'react'

import { Modal, type ModalProps } from 'antd'

interface PropTypes extends ModalProps {
  bodyScroll?: boolean
}

const ModalWrapper = (props: PropTypes): JSX.Element | null => {
  const { children, bodyScroll, ...restProps } = props
  return <Modal centered {...restProps}>{bodyScroll ? <div className={'modal-scrollbar-adjust'}>{children}</div> : children}</Modal>
}

export default ModalWrapper
