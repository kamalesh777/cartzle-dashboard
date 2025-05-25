import React from 'react'

import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, type MenuProps } from 'antd'

import { TableWrapper } from '@/components/Wrapper'

const RoleSettingList = (): JSX.Element => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ]

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: () => (
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisOutlined />
        </Dropdown>
      ),
    },
  ]

  return <TableWrapper dataSource={dataSource} columns={columns} />
}

export default RoleSettingList
