import { ModalWrapper } from '@/components/Wrapper'
import { modalCloseHandler } from '@/utils/commonFunctions'
import React from 'react'
import { ModalPropTypes } from 'src/types/common'

const VariantsGroupModal = ({ openModal, setOpenModal }: ModalPropTypes<never>): JSX.Element => {

  const closeModal = (): void => modalCloseHandler(setOpenModal)
  return (
    <ModalWrapper open={openModal} onCancel={closeModal} title="Group Variants">
        
      
    </ModalWrapper>
  )
}

export default VariantsGroupModal