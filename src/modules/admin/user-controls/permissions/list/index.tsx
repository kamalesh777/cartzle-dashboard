'use client'
import React, { useState } from 'react'

import { Row, type MenuProps, type TableProps } from 'antd'

import { useRouter } from 'next/navigation'

import type { ListDataTypes } from '../types'

import { TableActionButton } from '@/components/Common'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import {
  ButtonWrapper,
  ColWrapper,
  InputSearchWrapper,
  SpaceWrapper,
  TableWrapper,
} from '@/components/Wrapper'

import { SETTINGS_ROUTE, } from '@/constants/AppConstant'

import { listData } from '../static/data'

const PermissionList = (): JSX.Element => {
  const router = useRouter()
  const [, setSearchValue] = useState<string>('')

  const items = (record: ListDataTypes): MenuProps['items'] => [
    {
      label: 'Update',
      key: 'update',
      onClick: () => redirectToUrlPath(record?.id),
    },
    {
      label: 'Delete',
      key: 'delete',
    },
  ]

  const columns: TableProps<ListDataTypes>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    // {
    //   title: 'Created At',
    //   dataIndex: 'created_at',
    // },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: record => <TableActionButton items={items(record)} />,
    },
  ]

  const redirectToUrlPath = (dynamicId: string): void => {
    const MAIN_URL = `${SETTINGS_ROUTE}/permissions/${dynamicId}`
    router.push(MAIN_URL)
  }

  return (
    <div id="permissions">
      <TableWrapper
        dataSource={listData}
        columns={columns}
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={8}>
              <h4 className="ant-card-head-title">Permissions</h4>
            </ColWrapper>
            <ColWrapper md={16} className="text-right">
              <SpaceWrapper>
                <InputSearchWrapper
                  placeholder="Search by name or phone..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper type="primary" onClick={() => redirectToUrlPath('create')}>
                  New
                </ButtonWrapper>
              </SpaceWrapper>
            </ColWrapper>
          </Row>
        )}
      />
    </div>
  )
}

export default PermissionList
