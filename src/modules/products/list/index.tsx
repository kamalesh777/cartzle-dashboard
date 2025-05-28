'use client'
import React from 'react'

import { type TableColumnsType, Row, Col, Space } from 'antd'

import { useRouter } from 'next/navigation'

import { ButtonWrapper, TableWrapper } from '@/components/Wrapper'
import CommonSearchComp from '@/components/Wrapper/CommonSearch'
import { PRODUCT_LIST_ROUTE } from '@/constants/AppConstant'

import { listData } from '../static/data'

const ProductListComp = (): JSX.Element => {
  const router = useRouter()
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
  ]

  return (
    <>
      <TableWrapper
        title={() => (
          <Row justify={'space-between'}>
            <Col md={12}>
              <h3 className="fw-bold">Products</h3>
            </Col>
            <Col md={12} className="text-right">
              <Space>
                <CommonSearchComp placeholder="Search by name or categorie..." />
                <ButtonWrapper type="primary" onClick={() => router.push(`${PRODUCT_LIST_ROUTE}/create`)}>
                  Add
                </ButtonWrapper>
              </Space>
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
