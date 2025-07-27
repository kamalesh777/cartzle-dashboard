import React, { useEffect } from 'react'

import { DeleteOutlined } from '@ant-design/icons'
import { Row } from 'antd'

import type { UnitsPayload } from '../../types'

import { deleteRequest } from '@/api/preference/RequestService'
import { TableContentLoaderWithProps, Toast } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, EmptyWrapper, SpaceWrapper } from '@/components/Wrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

import UnitsManagemodal from '../modal/UnitsManagemodal'

const UnitsList = (): JSX.Element => {
  const { fetchData, data, isLoading } = useGetRequestHandler<UnitsPayload[]>()

  const [openModal, setOpenModal] = React.useState(false)

  const fetchUnitList = async (): Promise<void> => {
    fetchData('/api/unit-list')
  }

  useEffect(() => {
    fetchUnitList()
  }, [])

  // Delete unit API
  const deleteUnit = async (id: string): Promise<void> => {
    const res = await deleteRequest(`/api/unit-delete/${id}`)
    if (res.data?.success) {
      Toast('success', res.data?.message)
      fetchUnitList()
    } else {
      Toast('error', res.data?.message)
    }
  }

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
              }}
            >
              New
            </ButtonWrapper>
          }
        >
          <Row gutter={COMMON_ROW_GUTTER}>
            {isLoading ? (
              <div className="w-100">
                <TableContentLoaderWithProps columnWidth={[20, 20, 20, 20, 20]} rowCounts={2} />
              </div>
            ) : data && data?.length > 0 ? (
              data?.map((item: UnitsPayload) => (
                <ColWrapper md={4} span={8} key={item.id}>
                  <CardWrapper styles={{ body: { padding: '10px' } }} className="mb-3 show bg-gray-100">
                    <SpaceWrapper className="w-100 justify-content-between">
                      <p>{item.name}</p>
                      <DeleteOutlined
                        className="on-hover cursor-pointer error-color"
                        onClick={() => deleteUnit(item.id as string)}
                      />
                    </SpaceWrapper>
                  </CardWrapper>
                </ColWrapper>
              ))
            ) : (
              <EmptyWrapper entity="Units" className="w-100" />
            )}
          </Row>
        </CardWrapper>
      </div>
      {openModal && (
        <UnitsManagemodal openModal={openModal} setOpenModal={setOpenModal} afterSubmit={fetchUnitList} />
      )}
    </>
  )
}

export default UnitsList
