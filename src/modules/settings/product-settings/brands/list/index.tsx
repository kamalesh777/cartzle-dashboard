import React from 'react'

import type { CategoryList } from '../../types'

import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import BrandManageModal from '../modal/BrandManageModal'
import { MenuProps } from 'antd'

const CategoryCard = (): JSX.Element => {
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const getMoreMenus = (record: CategoryList): MenuProps['items'] => [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => {
        setSelectedId(record.id)
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
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit Type',
      dataIndex: 'unitType',
    },
    {
      title: 'Units',
      dataIndex: 'units',
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: (record: CategoryList) => <TableActionButton items={getMoreMenus(record)} />,
    },
  ]

  const data = [
    {
      key: '1',
      name: 'Category 1',
      unitType: 'Unit Type 1',
      units: 'Units 1',
    },
    {
      key: '2',
      name: 'Category 2',
      unitType: 'Unit Type 2',
      units: 'Units 2',
    },
  ]

  const ACTION_COMP = (
    <SpaceWrapper className="w-100 justify-content-between">
      <h4 className="ant-card-head-title">Brands</h4>
      <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>
        New
      </ButtonWrapper>
    </SpaceWrapper>
  )

  return (
    <>
      <div id="brands" className="mb-3">
        <TableWrapper title={() => ACTION_COMP} columns={columns} dataSource={data} />
      </div>
      {openModal && <BrandManageModal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default CategoryCard
