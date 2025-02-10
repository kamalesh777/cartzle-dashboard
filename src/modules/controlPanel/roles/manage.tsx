'use client'
import React from 'react'

import { type TableColumnsType, Table, Checkbox, Form, Space, Row, Col, type CheckboxProps } from 'antd'

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

  const permissionsData = Form.useWatch('permissions', form)
  console.log('==formData', permissionsData)

  const checkAllColHandler: CheckboxProps['onChange'] = (e): void => {
    const isChecked = e.target.checked
    const checkedVal = e.target.value

    for (const key in permissionsData) {
      const arr = key === checkedVal ? permissionsData[key] : []
      if (isChecked) {
        form.setFieldValue(['permissions', key], [...arr, checkedVal])
      } else {
        form.setFieldValue(['permissions', key], arr)
      }
    }

    // form.setFieldValue('permissions', )
  }

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
            <Col sm={4} key={obj.name} className="text-center">
              <Space direction="vertical" size={0}>
                {startCase(obj.name)} <Checkbox value={obj.name} onChange={checkAllColHandler} />
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

  return (
    <Form form={form}>
      <Table<DataType> columns={columns} dataSource={data} rowKey="name" />
    </Form>
  )
}

export default RoleManageComp
