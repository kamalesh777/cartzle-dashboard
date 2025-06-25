import React, { useEffect } from 'react'

import { Row } from 'antd'

import type { UnitsPayload } from '../../types'

import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

import UnitsManagemodal from '../modal/UnitsManagemodal'

const UnitsList = () => {
  const { fetchData, data } = useGetRequestHandler<UnitsPayload[]>()

  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const fetchUnits = async () => {
    fetchData('/api/units-list')
  }

  useEffect(() => {
    fetchUnits()
  }, [])

  const getMoreMenus = (record: UnitsPayload) => [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => {
        setSelectedId(record.id as string)
        setOpenModal(true)
      },
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: () => {
        console.log(record)
      },
    },
  ]

  return (
    <>
      <div id="units" className="mb-3">
        <CardWrapper
          title={'Units'}
          extra={
            <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>
              New
            </ButtonWrapper>
          }
        >
          <Row gutter={COMMON_ROW_GUTTER}>
            {data?.map((item: UnitsPayload) => (
              <ColWrapper md={4} span={8} key={item.id}>
                <CardWrapper styles={{ body: { padding: '10px' } }} className="mb-3">
                  <SpaceWrapper className="w-100 justify-content-between">
                    <p>{item.value}</p>
                    <TableActionButton tooltipTitle="" items={getMoreMenus(item as UnitsPayload)} />
                  </SpaceWrapper>
                </CardWrapper>
              </ColWrapper>
            ))}
          </Row>
        </CardWrapper>
      </div>
      {openModal && <UnitsManagemodal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default UnitsList
