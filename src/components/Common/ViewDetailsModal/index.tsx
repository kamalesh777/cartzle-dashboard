import React from 'react'

import { Row, Col, Typography } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { ButtonWrapper, ModalWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { useGetRequestHandler } from '@/hook/requestHandler'
import { modalCloseHandler } from '@/utils/commonFunctions'

const { Text } = Typography

const ViewDetailsModal = ({ openModal, setOpenModal }: ModalPropTypes): JSX.Element | null => {
  const { data } = useGetRequestHandler()

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)
  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title="View Details"
      footer={<ButtonWrapper onClick={closeModal}>Close</ButtonWrapper>}
    >
      <div className="view-details-body">
        {!!data &&
          Object?.entries(data as Record<string, unknown>)?.map(item => (
            <Row gutter={COMMON_ROW_GUTTER} key={item[0]} className="mb-2">
              <Col span={8}>
                <Text strong>{item[0]}:</Text>
              </Col>
              <Col span={16}>
                <Text>{item[1] as string}</Text>
              </Col>
            </Row>
          ))}
      </div>
    </ModalWrapper>
  )
}

export default ViewDetailsModal
