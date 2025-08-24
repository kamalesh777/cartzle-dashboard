// eslint-disable-next-line import/named
import React from 'react'

import { Modal, type ModalProps } from 'antd'

interface PropTypes extends ModalProps {
  bodyScroll?: boolean | string
}

const ModalWrapper = (props: PropTypes): JSX.Element | null => {
  const { children, bodyScroll = false, ...restProps } = props
  return (
    <Modal centered {...restProps}>
      <style jsx global>
        {`
          .modal-scrollbar-adjust {
            max-height: ${bodyScroll ? bodyScroll || '400px' : 'auto'};
            overflow-y: ${bodyScroll ? 'scroll' : 'auto'};
            padding-right: 15px;
            scrollbar-width: thin;
          }
        `}
      </style>
      {bodyScroll ? <div className={'modal-scrollbar-adjust'}>{children}</div> : children}
    </Modal>
  )
}

export default ModalWrapper
