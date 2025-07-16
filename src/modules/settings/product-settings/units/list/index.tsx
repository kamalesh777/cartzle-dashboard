import React, { useEffect } from 'react'

import { DeleteOutlined } from '@ant-design/icons'
import { Row } from 'antd'

import type { UnitsPayload } from '../../types'

import { TableContentLoaderWithProps } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

import UnitsManagemodal from '../modal/UnitsManagemodal'

const UnitsList = (): JSX.Element => {
  const { fetchData, data, isLoading } = useGetRequestHandler<UnitsPayload[]>()

  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const fetchUnits = async (): Promise<void> => {
    fetchData('/api/unit-list')
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  return (
    <>
      <div id="units" className="mb-3">
        <CardWrapper
          title={'Units'}
          extra={
            <ButtonWrapper
              type="primary"
              onClick={() => {
                setOpenModal(true)
                setSelectedId('')
              }}
            >
              New
            </ButtonWrapper>
          }
        >
          <Row gutter={COMMON_ROW_GUTTER}>
            {isLoading ? (
              <div className="w-100">
                <TableContentLoaderWithProps columnWidth={[15, 15, 15, 15, 15, 15]} rowCounts={2} />
              </div>
            ) : (
              data?.map((item: UnitsPayload) => (
                <ColWrapper md={4} span={8} key={item.id}>
                  <CardWrapper styles={{ body: { padding: '10px' } }} className="mb-3 show">
                    <SpaceWrapper className="w-100 justify-content-between">
                      <p>{item.name}</p>
                      <DeleteOutlined className="on-hover cursor-pointer error-color" />
                    </SpaceWrapper>
                  </CardWrapper>
                </ColWrapper>
              ))
            )}
          </Row>
        </CardWrapper>
      </div>
      {openModal && <UnitsManagemodal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default UnitsList
