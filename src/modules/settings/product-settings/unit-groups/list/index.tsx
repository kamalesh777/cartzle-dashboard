/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { Row, type MenuProps } from 'antd'

import type { BrandTypePayload, CategoryList } from '../../types'

import { TableActionButton, TableContentLoaderWithProps } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'

import UnitTypeManageModal from '../modal/UnitGroupManageModal'

const UnitGroupsCard = (): JSX.Element => {
  const { fetchData, data, isLoading } = useGetRequestHandler<CategoryList[]>()
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const fetchUnitGroups = async (): Promise<void> => {
    fetchData('/api/unit-group-list')
  }

  useEffect(() => {
    fetchUnitGroups()
  }, [])

  /**
   * Creates a menu for more actions on a unit group.
   * @param {BrandTypePayload} record The unit group data.
   * @returns {MenuProps['items']} The menu items.
   */
  const getMoreMenus = (record: BrandTypePayload): MenuProps['items'] => [
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
        // Handle delete action
      },
    },
  ]

  return (
    <>
      <div id="unit-groups" className="mb-3">
        <CardWrapper
          title={'Unit Groups'}
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
                <TableContentLoaderWithProps columnWidth={[23, 23, 23, 23]} rowCounts={2} />
              </div>
            ) : (
              data?.map((item: CategoryList) => (
                <ColWrapper md={6} span={12} key={item.name}>
                  <CardWrapper styles={{ body: { padding: '10px' } }} className="mb-3">
                    <SpaceWrapper className="w-100 justify-content-between">
                      <p>{item.name}</p>
                      <TableActionButton tooltipTitle="" items={getMoreMenus(item as BrandTypePayload)} />
                    </SpaceWrapper>
                  </CardWrapper>
                </ColWrapper>
              ))
            )}
          </Row>
        </CardWrapper>
      </div>
      {openModal && (
        <UnitTypeManageModal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />
      )}
    </>
  )
}

export default UnitGroupsCard
