'use client'
import React from 'react'

import { type TableColumnsType, Checkbox, Form, Row, Col, type CheckboxProps, Input } from 'antd'

import { startCase } from 'lodash'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { CardWrapper, FormItemWrapper, InputWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

interface DataType {
  key: React.ReactNode
  name: string
  permissions?: string[]
  children?: DataType[]
}

const PermissionManageComp = (): JSX.Element => {
  const [form] = Form.useForm()

  const permissionsArr = [
    {
      name: 'Create',
      _id: 'create', // Create new entries/items
    },
    {
      name: 'Modify',
      _id: 'modify', // Update/edit existing entries
    },
    {
      name: 'View',
      _id: 'view', // Read-only or detail view
    },
    {
      name: 'Delete',
      _id: 'delete', // Remove entries/items
    },
    {
      name: 'Export',
      _id: 'export', // Export data (CSV, PDF, etc.)
    },
    {
      name: 'Settings',
      _id: 'settings', // Export data (CSV, PDF, etc.)
    },
  ]

  const permissionsData = Form.useWatch('permissions', form)

  const checkAllColHandler: CheckboxProps['onChange'] = (e): void => {
    const { checked, value } = e.target

    const updatedPermissions = Object.keys(permissionsData).reduce((acc, key) => {
      const previousValue = permissionsData[key] || []

      if (checked) {
        // Use Set to avoid duplicates
        acc[key] = [...new Set([...previousValue, value])] as string[]
      } else {
        acc[key] = previousValue.filter((item: string) => item !== value)
      }

      return acc
    }, {} as Record<string, string[]>)

    // Set the updated permissions in one go
    form.setFieldValue('permissions', updatedPermissions)
  }

  // console.log("===permissionsObj", permissionsObj)

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Page Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: (
        <Row justify="end">
          {permissionsArr.map(obj => (
            <Col sm={4} key={obj.name} className="text-center">
              <SpaceWrapper direction="vertical" size={0}>
                {startCase(obj.name)} <Checkbox indeterminate={false} value={obj.name} onChange={checkAllColHandler} />
              </SpaceWrapper>
            </Col>
          ))}
        </Row>
      ),
      width: '70%',
      dataIndex: 'permissions',
      render: (_, record) => {
        return (
          <FormItemWrapper name={['permissions', record.name]} noStyle>
            <Checkbox.Group className="w-100">
              <Row justify="end">
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

  const MainComponent = (
    <Form form={form} layout="vertical">
      <CardWrapper styles={{ body: { paddingBottom: '10px' } }}>
        <FormItemWrapper name="name" label="Name">
          <InputWrapper />
        </FormItemWrapper>
        <FormItemWrapper name="description" label="Description">
          <Input.TextArea rows={3} />
        </FormItemWrapper>
      </CardWrapper>
      <TableWrapper<DataType> columns={columns} dataSource={data} defaultExpandAllRows rowKey="page_name" />
    </Form>
  )
  return <DynamicPageLayout MainComp={MainComponent} />
}

export default PermissionManageComp
