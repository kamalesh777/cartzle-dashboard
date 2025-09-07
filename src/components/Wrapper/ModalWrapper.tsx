// eslint-disable-next-line import/named
import React from 'react'

import { Modal, type ModalProps } from 'antd'

interface PropTypes extends ModalProps {
  bodyScroll?: boolean | string
}

const ModalWrapper = (props: PropTypes): JSX.Element | null => {
  const { children, bodyScroll = false, ...restProps } = props
  // if bodyScroll is true then set max-height to 400px else auto
  const maxheight = bodyScroll ? (String(bodyScroll)?.includes('px') ? bodyScroll : '400px') : 'auto'
  return (
    <Modal centered {...restProps}>
      <style jsx global>
        {`
          .modal-scrollbar-adjust {
            max-height: ${maxheight};
            overflow-y: ${bodyScroll ? 'scroll' : 'auto'};
            padding-right: 5px;
            scrollbar-width: thin;
            position: relative;
          }
        `}
      </style>
      {bodyScroll ? <div className={'modal-scrollbar-adjust'}>{children}</div> : children}
    </Modal>
  )
}

export default ModalWrapper
