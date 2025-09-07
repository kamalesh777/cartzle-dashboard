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
            scrollbar-width: thin;
          }
          .modal-scrollbar {
            position: relative;
            scrollbar-color: transparent transparent;
          }
          .modal-scrollbar:after {
            content: '';
            position: absolute;
            top: 0;
            right: 0px;
            height: 100%;
            width: 8px;
            border-radius: 5px;
            background-color: transparent;
          }
          .modal-scrollbar:hover {
            padding-right: 12px;
          }
          .modal-scrollbar:hover:after {
            background-color: #eee;
          }
        `}
      </style>
      {bodyScroll ? (
        <div className={'modal-scrollbar-adjust'}>
          <div className="modal-scrollbar">{children}</div>
        </div>
      ) : (
        children
      )}
    </Modal>
  )
}

export default ModalWrapper
