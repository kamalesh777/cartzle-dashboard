'use client'
import React, { useState } from 'react'

import { type TableColumnsType, type MenuProps, Row, Col } from 'antd'

import { useRouter } from 'next/navigation'

import type { ProductDataTypes } from '../types'

import TableActionButton from '@/components/Common/TableActionButton'
import { ButtonWrapper, TableWrapper } from '@/components/Wrapper'
import InputSearchWrapper from '@/components/Wrapper/InputSearchWrapper'
import { PRODUCT_LIST_ROUTE } from '@/constants/AppConstant'

import { listData } from '../static/data'

const ProductListComp = (): JSX.Element => {
  const router = useRouter()
  const [, setSearchValue] = useState<string>('')

  const getMoreMenus = (record: ProductDataTypes): MenuProps['items'] => [
    {
      label: 'Update',
      key: 'update',
      onClick: () => router.push(`${PRODUCT_LIST_ROUTE}/${record?.name}`),
    },
  ]

  // product list columns
  const columns: TableColumnsType<ProductDataTypes> = [
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
      render: price => `₹${price.toFixed(2)}`,
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      render: price => `₹${price.toFixed(2)}`,
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: (_, record) => <TableActionButton items={getMoreMenus(record)} />,
    },
  ]

  return (
    <>
      <TableWrapper
        title={() => (
          <Row justify={'space-between'}>
            <Col md={12}>
              <h4 className="ant-card-head-title">Products</h4>
            </Col>
            <Col md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper
                  placeholder="Search by name or categories..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper
                  type="primary"
                  className="ms-2"
                  onClick={() => router.push(`${PRODUCT_LIST_ROUTE}/create`)}
                >
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

export default ProductListComp
