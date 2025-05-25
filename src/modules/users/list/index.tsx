/* eslint-disable no-duplicate-imports */
'use client'
import React from 'react'

import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, type TableProps } from 'antd'

import type { MenuProps } from 'antd'

import { TableWrapper } from '@/components/Wrapper'

interface DataType {
  key: string
  name: string
  phone: number
  status: string
  job_role: string[]
  address_info: {
    city: string
    pin: string
    state: string
    address: string
  }
}

const UsersListComp = (): JSX.Element => {
  const items: MenuProps['items'] = [
    {
      label: (
        <a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
          1st menu item
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a href="https://www.aliyun.com" target="_blank" rel="noopener noreferrer">
          2nd menu item
        </a>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Job Role',
      dataIndex: 'job_role',
      key: 'job_role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: (_, record) => (
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
    },
    {
      key: '2',
      name: 'Jim Green',
    },
    {
      key: '3',
      name: 'Joe Black',
    },
  ]
  return <TableWrapper columns={columns} dataSource={data} />
}

export default UsersListComp
