import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'
import React from 'react'
import CategoryManageModal from '../modal/CategoryManageModal'
import { CategoryList } from '../../types'

const CategoryCard = () => {
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState('')
    const getMoreMenus = (record: CategoryList) => [
        {
            key: 'edit',
            title: 'Edit',
            onClick: () => {
                setSelectedId(record.id)
                setOpenModal(true)
            },
        },
        {
            key: 'delete',
            title: 'Delete',
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
            render: (record: CategoryList) => (
                <TableActionButton items={getMoreMenus(record)} />
            ),
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
            <h4 className="ant-card-head-title">Categories</h4>
            <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>New</ButtonWrapper>
        </SpaceWrapper>
    )
  return (
    <>
    <div id="categories" className="mb-3">
        <TableWrapper title={() => ACTION_COMP} columns={columns} dataSource={data} />
    </div>
    {openModal && <CategoryManageModal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default CategoryCard