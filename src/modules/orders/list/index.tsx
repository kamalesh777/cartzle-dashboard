'use client'
import React, { useState } from 'react'

import { type TableColumnsType, type MenuProps, Row, Col } from 'antd'

import { upperFirst } from 'lodash'
import { useParams, useRouter } from 'next/navigation'

import type { ListDataTypes, PageTypes } from '../types'

import { NotFoundPage } from '@/components/Common'
import TableActionButton from '@/components/Common/TableActionButton'
import { ButtonWrapper, TableWrapper } from '@/components/Wrapper'
import InputSearchWrapper from '@/components/Wrapper/InputSearchWrapper'
import { ORDER_LIST_ROUTE } from '@/constants/AppConstant'

import { getDecimal } from '@/utils/commonFunctions'

import { listData } from '../static/data'

const OrderListComp = (): JSX.Element => {
  const router = useRouter()
  const params = useParams()

  const [, setSearchValue] = useState<string>('')

  if (!['sales', 'purchases'].includes((params as unknown as PageTypes)?.type)) {
    return <NotFoundPage height="80vh" message="Page not found" />
  }

  const getMoreMenus = (record: ListDataTypes): MenuProps['items'] => [
    {
      label: 'Update',
      key: 'update',
      onClick: () => router.push(`${ORDER_LIST_ROUTE}/${params?.type}/${record?.name}`),
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
      // render: (_, record) => `${record.width} × ${record.thickness} × ${record.length} cm`,
    },
    {
      title: 'Supplier',
      dataIndex: ['supplier', 'name'],
    },
    {
      title: 'Purchase Price',
      dataIndex: 'purchase_price',
      render: price => `₹${getDecimal(price)}`,
    },
    {
      title: 'Sale Price',
      dataIndex: 'sale_price',
      render: price => `₹${getDecimal(price)}`,
    },
    {
      title: '',
      dataIndex: 'action',
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
              <h4 className="ant-card-head-title">{upperFirst(params?.type as PageTypes['type'])}</h4>
            </Col>
            <Col md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper
                  placeholder="Search by name or phone..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper
                  type="primary"
                  className="ms-2"
                  onClick={() => router.push(`${ORDER_LIST_ROUTE}/${params?.type}/create`)}
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

export default OrderListComp
