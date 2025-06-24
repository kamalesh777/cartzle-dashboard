import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'
import React from 'react'
import { BrandTypePayload, CategoryList } from '../../types'
import { Row } from 'antd'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import UnitsManagemodal from '../modal/UnitsManagemodal'

const UnitsList = () => {
    const [openModal, setOpenModal] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState('')

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



    return (
        <>
            <div id="units" className="mb-3">
                <CardWrapper title={"Units"} extra={<ButtonWrapper type="primary" onClick={() => setOpenModal(true)}>New</ButtonWrapper>}>
                <Row gutter={COMMON_ROW_GUTTER}>
                    {data?.map((item) => (
                        <ColWrapper md={4} span={8} key={item.name}>
                            <CardWrapper styles={{body: {padding: '10px'}}}>
                                <SpaceWrapper className='w-100 justify-content-between'>
                                    <p>{item.name}</p>
                                    <TableActionButton tooltipTitle="" items={getMoreMenus(item as BrandTypePayload)} />
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