/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'

import { type MenuProps } from 'antd'

import type { CategoryList, UnitsTypes } from '../../types'

import { TableActionButton } from '@/components/Common'
import EmptyContentWithLoading from '@/components/Common/EmptyContentTableLoading'
import { ButtonWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import { useGetRequestHandler } from '@/hook/requestHandler'

import CategoryManageModal from '../modal/CategoryManageModal'

const CategoryCard = (): JSX.Element => {
  // fetch all categories
  const { fetchData, data, isLoading } = useGetRequestHandler<CategoryList[]>()

  const [openModal, setOpenModal] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState('')

  const fetchCategories = async (): Promise<void> => {
    fetchData('/api/category-list?include=true')
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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
      className: 'error-color',
      onClick: () => {
        // Handle delete action
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
      title: '',
      key: 'action',
      className: 'text-right',
      render: (record: CategoryList) => <TableActionButton items={getMoreMenus(record)} />,
    },
  ]

  // expanded data source for unit groups

  // expanded columns for unit groups
  const expandColumns = [
    { title: 'Unit Group', dataIndex: 'name', key: 'name', className: 'small-size' },
    {
      title: 'Units',
      dataIndex: 'units',
      key: 'units',
      className: 'small-size',
      render: (units: UnitsTypes[]) => units.map(obj => obj.name).join(', '),
    },
  ]

  // expanded row render function
  const expandedRowRender = (record: CategoryList): JSX.Element => {
    return <TableWrapper columns={expandColumns} dataSource={record?.unitGroups} pagination={false} />
  }

  const ACTION_COMP = (
    <SpaceWrapper className="w-100 justify-content-between">
      <h4 className="ant-card-head-title">Categories</h4>
      <ButtonWrapper
        type="primary"
        onClick={() => {
          setOpenModal(true)
          setSelectedId('')
        }}
      >
        New
      </ButtonWrapper>
    </SpaceWrapper>
  )

  return (
    <>
      <div id="categories" className="mb-3">
        <TableWrapper
          title={() => ACTION_COMP}
          columns={columns}
          dataSource={data || []}
          locale={{
            emptyText: (
              <EmptyContentWithLoading entity="Categories" isLoading={isLoading} columns={[30, 40, 30]} />
            ),
          }}
          expandedRowRender={expandedRowRender}
        />
      </div>
      {openModal && (
        <CategoryManageModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedId={selectedId}
          afterSubmit={fetchCategories}
        />
      )}
    </>
  )
}

export default CategoryCard
