'use client'
import React, { useState } from 'react'

import { type TableColumnsType, type MenuProps, Row, Col } from 'antd'

import { useRouter } from 'next/navigation'

import type { ListDataTypes } from '../types'

import { ButtonWrapper, TableWrapper } from '@/components/Wrapper'
import InputSearchWrapper from '@/components/Wrapper/InputSearchWrapper'
import TableActionButton from '@/components/Wrapper/TableActionButton'
import { PURCHASE_LIST_ROUTE } from '@/constants/AppConstant'

import { getDecimal } from '@/utils/commonFunctions'

import { listData } from '../static/data'

const PurchaseListComp = (): JSX.Element => {
  const router = useRouter()
  const [, setSearchValue] = useState<string>('')

  const getMoreMenus = (record: ListDataTypes): MenuProps['items'] => [
    {
      label: 'Update Details',
      key: 'update_details',
      onClick: () => router.push(`${PURCHASE_LIST_ROUTE}/${record?.name}`),
    },
  ]

  // product list columns
  const columns: TableColumnsType<ListDataTypes> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Dimensions (W × T × L)',
      key: 'dimensions',
      render: (_, record) => `${record.width} × ${record.thickness} × ${record.length} cm`,
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchasePrice',
      render: price => `₹${getDecimal(price)}`,
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      render: price => `₹${getDecimal(price)}`,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => <TableActionButton items={getMoreMenus(record)} />,
    },
  ]

  return (
    <>
      <TableWrapper
        title={() => (
          <Row justify={'space-between'}>
            <Col md={12}>
              <h3 className="fw-bold">Purchases</h3>
            </Col>
            <Col md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper placeholder="Search by name or phone..." onChange={e => setSearchValue(e.target.value)} />
                <ButtonWrapper type="primary" className="ms-2" onClick={() => router.push(`${PURCHASE_LIST_ROUTE}/create`)}>
                  Add
                </ButtonWrapper>
              </div>
            </Col>
          </Row>
        )}
        dataSource={listData}
        columns={columns}
      />
    </>
  )
}

export default PurchaseListComp
