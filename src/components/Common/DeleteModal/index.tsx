import { type Dispatch, type ReactNode, type SetStateAction, useState } from 'react'

import { ButtonWrapper, ModalWrapper } from '@/components/Wrapper'

const DeleteModal = ({ children, toggleDeleteModal, setToggleDeleteModal, title }: DeleteModalPropTypes): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteClick = (): void => {
    setIsLoading(true)
  }

  return (
    <ModalWrapper
      centered
      open={toggleDeleteModal}
      title={title}
      onCancel={() => {
        setToggleDeleteModal(false)
      }}
      footer={
        <div>
          <ButtonWrapper
            html-type="submit"
            type="primary"
            onClick={() => {
              handleDeleteClick()
            }}
            loading={isLoading}
          >
            {'Delete'}
          </ButtonWrapper>
          <ButtonWrapper
            className="modal-close-btn"
            onClick={() => {
              setToggleDeleteModal(false)
            }}
          >
            {'Cancel'}
          </ButtonWrapper>
        </div>
      }
    >
      <div>{children}</div>
    </ModalWrapper>
  )
}

interface DeleteModalPropTypes {
  children: ReactNode
  toggleDeleteModal: boolean
  setToggleDeleteModal: Dispatch<SetStateAction<boolean>>
  title: string
  nextEndpoint: string
  callBack: () => Promise<void>
  payload?: Record<string, unknown>
}

export default DeleteModal
