'use client'
import React from 'react'

import { type TableColumnsType, Table, Checkbox, Form, Space, Row, Col } from 'antd'

import { startCase } from 'lodash'

import { FormItemWrapper } from '@/components/Wrapper'

interface DataType {
  key: React.ReactNode
  name: string
  permissions?: string[]
  children?: DataType[]
}

const RoleManageComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const permissionsArr = [
    {
      name: 'view',
      _id: 'view_01',
    },
    {
      name: 'edit',
      _id: 'edit_01',
    },
    {
      name: 'delete',
      _id: 'delete_01',
    },
    {
      name: 'setting',
      _id: 'setting_01',
    },
    {
      name: 'modify',
      _id: 'modify_01',
    },
  ]

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Page Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: (
        <Row>
          {permissionsArr.map(obj => (
            <Col sm={4} key={obj.name}>
              <Space direction="vertical" className={'text-center'} size={0}>
                {startCase(obj.name)} <Checkbox />
              </Space>
            </Col>
          ))}
        </Row>
      ),
      dataIndex: 'permissions',
      render: (_, record) => {
        return (
          <FormItemWrapper name={['permissions', record.name]}>
            <Checkbox.Group className="w-100">
              <Row>
                {permissionsArr.map(obj => (
                  <Col sm={4} key={obj.name} className="text-center">
                    <Checkbox value={obj.name} />
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </FormItemWrapper>
        )
      },
    },
  ]

  const data: DataType[] = [
    {
      name: 'home',
      permissions: ['view', 'edit', 'delete', 'modify'],
      key: 'home',
    },
    {
      name: 'profile',
      permissions: ['view', 'edit', 'delete', 'modify'],
      key: 'profile',
      children: [
        {
          name: 'skill',
          permissions: ['view', 'settings'],
          key: 'skill',
        },
        {
          name: 'experience',
          permissions: ['edit', 'delete', 'list'],
          key: 'experience',
        },
      ],
    },
  ]

  const formData = Form.useWatch([], form)
  console.log('==formData', formData)

  return (
    <Form form={form}>
      <Table<DataType> columns={columns} dataSource={data} rowKey="name" />
    </Form>
  )
}

export default RoleManageComp
