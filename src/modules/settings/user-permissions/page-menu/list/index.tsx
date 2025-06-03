'use client'
import React, { useEffect, useState } from 'react'

import { EllipsisOutlined } from '@ant-design/icons'
import { Dropdown, Form, Row, type MenuProps } from 'antd'

import { ButtonWrapper, ColWrapper, TableWrapper } from '@/components/Wrapper'

import PageMenuModal from '../manage'

const PageMenuList = (): JSX.Element => {
  const [form] = Form.useForm()

  const [openManageModal, setManageModal] = useState<boolean>(false)

  const supposeObject = {
    page: 'Puja',
    cards: ['card1', 'card2', 'ayushi'],
  }

  useEffect(() => {
    if (supposeObject) {
      form.setFieldsValue(supposeObject)
    }
  }, [supposeObject])

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

  return (
    <div id="page-menu">
      <TableWrapper
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={12}>
              <h4 className="ant-card-head-title">Pages</h4>
            </ColWrapper>
            <ColWrapper md={12} className="text-right">
              <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                New
              </ButtonWrapper>
            </ColWrapper>
          </Row>
        )}
        dataSource={dataSource}
        columns={columns}
      />
      {openManageModal && <PageMenuModal openModal={openManageModal} setOpenModal={setManageModal} />}
    </div>
  )
}

export default PageMenuList
