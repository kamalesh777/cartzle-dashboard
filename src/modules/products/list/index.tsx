'use client'
import React, { useEffect, useState } from 'react'

import { type TableColumnsType, type MenuProps, Row, Col } from 'antd'

import { useRouter } from 'next/navigation'

import type { ProductDataTypes } from '../types'

import EmptyContentTableLoading from '@/components/Common/EmptyContentTableLoading'
import TableActionButton from '@/components/Common/TableActionButton'
import { ButtonWrapper, TableWrapper } from '@/components/Wrapper'
import InputSearchWrapper from '@/components/Wrapper/InputSearchWrapper'
import { PRODUCT_LIST_ROUTE } from '@/constants/AppConstant'

import { useGetRequestHandler } from '@/hook/requestHandler'
import { getCurrency } from '@/utils/currency'

const ProductListComp = (): JSX.Element => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState<string>('')

  const { data, isLoading, fetchData } = useGetRequestHandler<ProductDataTypes[]>()

  useEffect(() => {
    const searchQuery = searchValue ? `?search=${searchValue}` : ''
    fetchData(`/api/product-list${searchQuery}`)
  }, [searchValue])

  const getMoreMenus = (record: ProductDataTypes): MenuProps['items'] => [
    {
      label: 'Update',
      key: 'update',
      onClick: () => router.push(`${PRODUCT_LIST_ROUTE}/${record.id}`),
    },
  ]

  // product list columns
  const columns: TableColumnsType<ProductDataTypes> = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '25%',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
    },
    {
      title: 'Cost Price',
      dataIndex: 'costPrice',
      render: price => `${getCurrency()}${Number(price).toFixed(2)}`,
    },
    {
      title: 'Sale Price',
      dataIndex: 'salePrice',
      render: price => `${getCurrency()}${Number(price).toFixed(2)}`,
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
        dataSource={data || []}
        columns={columns}
        locale={{
          emptyText: (
            <EmptyContentTableLoading
              isLoading={isLoading}
              columns={[23, 14, 13, 13, 15, 11]}
              entity="Product"
            />
          ),
        }}
      />
    </>
  )
}

export default ProductListComp
