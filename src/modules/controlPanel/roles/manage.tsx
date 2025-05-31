'use client'
import React from 'react'

import { type TableColumnsType, Table, Checkbox, Form, Row, Col, type CheckboxProps } from 'antd'

import { startCase } from 'lodash'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { FormItemWrapper, SpaceWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE, ROLE_LIST_ROUTE } from '@/constants/AppConstant'

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
    <Form form={form}>
      <Table<DataType> pagination={false} columns={columns} dataSource={data} defaultExpandAllRows rowKey="name" />
    </Form>
  )
  return <DynamicPageLayout goBackUrl={`${CONTROL_PANEL_ROUTE}${ROLE_LIST_ROUTE}`} MainComp={MainComponent} />
}

export default RoleManageComp
