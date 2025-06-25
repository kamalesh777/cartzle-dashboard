import React, { useEffect } from 'react'

import { Row } from 'antd'

import type { BrandTypePayload, UnitTypePayload } from '../../types'

import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

import UnitTypeManageModal from '../modal/UnitTypeManageModal'

const UnitTypeCard = () => {
  const { fetchData, data, isLoading } = useGetRequestHandler<UnitTypePayload[]>()
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const fetchUnitTypes = async () => {
    fetchData('/api/unit-types-list')
  }

  useEffect(() => {
    fetchUnitTypes()
  }, [])

  const getMoreMenus = (record: BrandTypePayload) => [
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
      <div id="unit-types" className="mb-3">
        <CardWrapper
          title={'Unit Types'}
          extra={
            <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>
              New
            </ButtonWrapper>
          }
        >
          <Row gutter={COMMON_ROW_GUTTER}>
            {data?.map((item: UnitTypePayload) => (
              <ColWrapper md={6} span={12} key={item.name}>
                <CardWrapper styles={{ body: { padding: '10px' } }} loading={isLoading} className="mb-3">
                  <SpaceWrapper className="w-100 justify-content-between">
                    <p>{item.name}</p>
                    <TableActionButton tooltipTitle="" items={getMoreMenus(item as BrandTypePayload)} />
                  </SpaceWrapper>
                </CardWrapper>
              </ColWrapper>
            ))}
          </Row>
        </CardWrapper>
      </div>
      {openModal && <UnitTypeManageModal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default UnitTypeCard
