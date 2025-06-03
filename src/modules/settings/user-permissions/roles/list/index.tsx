'use client'
import React, { useState } from 'react'

import { Row, type MenuProps } from 'antd'

import { TableActionButton } from '@/components/Common'

import { ButtonWrapper, ColWrapper, InputSearchWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

const RolePermissionList = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')
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
      render: () => <TableActionButton items={items} />,
    },
  ]

  return (
    <div id="roles">
      <TableWrapper
        dataSource={dataSource}
        columns={columns}
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={8}>
              <h4 className="fw-bold">Roles</h4>
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

export default RolePermissionList
