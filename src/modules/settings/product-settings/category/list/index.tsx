import { TableActionButton, TableContentLoaderWithProps } from '@/components/Common'
import { ButtonWrapper, EmptyWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'
import React, { useEffect } from 'react'
import CategoryManageModal from '../modal/CategoryManageModal'
import { CategoryList, UnitsPayload } from '../../types'
import { useGetRequestHandler } from '@/hook/requestHandler'
import { UnitTypePayload } from '../../types'
import EmptyContentWithLoading from '@/components/Common/EmptyContentTableLoading'

const CategoryCard = () => {

    // fetch all categories
    const { fetchData, data, isLoading } = useGetRequestHandler<CategoryList[]>()
    
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState('')

    const fetchCategories = async () => {
        fetchData('/api/categories-list-full')
    }

    useEffect(() => {
        fetchCategories()
    }, [])

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

    const ACTION_COMP = (
        <SpaceWrapper className="w-100 justify-content-between">
            <h4 className="ant-card-head-title">Categories</h4>
            <ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>New</ButtonWrapper>
        </SpaceWrapper>
    )

  return (
    <>
    <div id="categories" className="mb-3">
        <TableWrapper title={() => ACTION_COMP} 
        columns={columns} 
        dataSource={data || []}
        locale={{
            emptyText: <EmptyContentWithLoading isLoading={isLoading} columns={[30, 30, 30, 10]} />
        }}/>
    </div>
    {openModal && <CategoryManageModal openModal={openModal} setOpenModal={setOpenModal} selectedId={selectedId} />}
    </>
  )
}

export default CategoryCard