import React, { useState } from 'react'

import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

import { deleteRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'

interface DeleteModalProps {
  apiEndpoint: string
  openModal: boolean
  closeModal: (value: boolean) => void
  description: string
  children?: React.ReactNode
  method?: 'delete' // only delete method is supported otherwise use customRequest
  customRequest?: () => Promise<void>
  afterDelete?: () => void
  okButton?: {
    text?: string
    onClick?: () => void
  }
  cancelButton?: {
    text?: string
    onClick?: () => void
  }
}

const DeleteModalWrapper: React.FC<DeleteModalProps> = ({
  apiEndpoint,
  openModal,
  closeModal,
  description,
  children,
  method = 'delete',
  customRequest,
  afterDelete,
  okButton = {},
  cancelButton = {},
}) => {
  const [loading, setLoading] = useState(false)

  const handleOk = async (): Promise<void> => {
    setLoading(true)
    try {
      if (customRequest) {
        await customRequest()
      } else {
        switch (method.toLowerCase()) {
          case 'delete':
            const res = await deleteRequest(apiEndpoint)
            if (!res.data.success) {
              Toast('error', res.data.message)
            }
            break
          // Add other methods if needed in the future
          default:
            // eslint-disable-next-line no-console
            console.warn(`Method ${method} is not implemented`)
            break
        }
      }

      // Call okButton.onClick if provided
      if (okButton.onClick) {
        okButton.onClick()
      }

      // Call afterDelete callback if provided
      if (afterDelete) {
        afterDelete()
      }

      closeModal(false)
    } catch (error) {
      Toast('error', (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = (): void => {
    if (cancelButton.onClick) {
      cancelButton.onClick()
    }
    closeModal(false)
  }

  return (
    <Modal
      open={openModal}
      title={
        <div className="flex items-center gap-2 error-color">
          <ExclamationCircleOutlined className="me-2" />
          <span>Confirm Delete</span>
        </div>
      }
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText={okButton.text || 'Delete'}
      cancelText={cancelButton.text || 'Cancel'}
      okButtonProps={{
        danger: true,
        className: 'bg-red-500 hover:bg-red-600',
      }}
    >
      <div className="mb-4">
        <p className="mb-4">{description}</p>
        {children}
      </div>
    </Modal>
  )
}

export default DeleteModalWrapper
