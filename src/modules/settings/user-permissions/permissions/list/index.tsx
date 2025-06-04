'use client'
import React, { useState } from 'react'

import { Row, type MenuProps, type TableProps } from 'antd'

import type { ListDataTypes } from '../types'

import { TableActionButton } from '@/components/Common'

import { ButtonWrapper, ColWrapper, InputSearchWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import { listData } from '../static/data'

const PermissionList = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')

  const items: MenuProps['items'] = [
    {
      label: 'Update Role',
      key: 'update_role',
    },
    {
      label: 'Delete Role',
      key: 'delete_role',
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
      render: () => <TableActionButton items={items} />,
    },
  ]

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
                <InputSearchWrapper placeholder="Search by name or phone..." onChange={e => setSearchValue(e.target.value)} />
                <ButtonWrapper type="primary">New</ButtonWrapper>
              </SpaceWrapper>
            </ColWrapper>
          </Row>
        )}
      />
    </div>
  )
}

export default PermissionList
