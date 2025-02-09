'use client'
import React from 'react'

import { type TableColumnsType, Table, Checkbox, Space } from 'antd'

interface DataType {
  key: React.ReactNode
  name: string
  // add: boolean
  // list: boolean
  // view: boolean
  // edit: boolean
  // delete: boolean
  children?: DataType[]
}

const RoleManageComp = (): JSX.Element => {
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Page Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <Space direction="vertical" size={0}>
          Add <Checkbox />
        </Space>
      ),
      className: 'text-center',
      dataIndex: 'add',
      width: '10%',
      key: 'add',
      render: () => <Checkbox />,
    },
    {
      title: (
        <Space direction="vertical" size={0}>
          List <Checkbox />
        </Space>
      ),
      className: 'text-center',
      dataIndex: 'list',
      width: '10%',
      key: 'list',
      render: () => <Checkbox />,
    },
    {
      title: (
        <Space direction="vertical" size={0}>
          View <Checkbox />
        </Space>
      ),
      className: 'text-center',
      dataIndex: 'view',
      key: 'view',
      width: '10%',
      render: () => <Checkbox />,
    },
    {
      title: (
        <Space direction="vertical" size={0}>
          Modify <Checkbox />
        </Space>
      ),
      className: 'text-center',
      dataIndex: 'modify',
      width: '10%',
      key: 'modify',
      render: () => <Checkbox />,
    },
    {
      title: (
        <Space direction="vertical" size={0}>
          Delete <Checkbox />
        </Space>
      ),
      className: 'text-center',
      dataIndex: 'delete',
      width: '10%',
      key: 'delete',
      render: () => <Checkbox />,
    },
  ]

  const data: DataType[] = [
    {
      key: 1,
      name: 'Home',
      children: [
        {
          key: 11,
          name: 'Location',
        },
        {
          key: 12,
          name: 'Financial',
        },
        {
          key: 13,
          name: 'Skill',
          children: [
            {
              key: 131,
              name: 'Award',
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Profile',
    },
  ]

  return <Table<DataType> columns={columns} dataSource={data} />
}

export default RoleManageComp
