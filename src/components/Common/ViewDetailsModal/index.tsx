import React, { useEffect, useState } from 'react'
import { Row, Col, Typography, Divider } from 'antd'
import { ModalPropTypes } from 'src/types/common'
import { useGetRequestHandler } from '@/hook/requestHandler'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { ButtonWrapper, ModalWrapper } from '@/components/Wrapper'
import { modalCloseHandler } from '@/utils/commonFunctions'

const { Title, Text } = Typography

const ViewDetailsModal = ({ openModal, setOpenModal }: ModalPropTypes): JSX.Element | null => {
    if (!openModal) {
        return null
    }
    // const { isLoading, data, fetchData } = useGetRequestHandler()
    const [data, setData] = useState({})

    const getData = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(json => setData(json))
    }

    useEffect(() => {
        getData()
    }, [])

    console.log("==data", data)
    // close modal handler
    const closeModal = () => modalCloseHandler(setOpenModal)
    return (
        <ModalWrapper open={openModal} onCancel={closeModal} title="View Details" footer={
            <ButtonWrapper onClick={closeModal}>Close</ButtonWrapper>
        }>
            <div className='view-details-body'>
                {
                    Object?.entries(data)?.map(item => (
                        <Row gutter={COMMON_ROW_GUTTER} className='mb-2'>
                            <Col span={8}><Text strong>{item[0]}:</Text></Col>
                            <Col span={16}><Text>{item[1] as string}</Text></Col>
                        </Row>
                    ))
                }
            </div>
        </ModalWrapper>
    )
}

export default ViewDetailsModal
