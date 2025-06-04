'use client'
import React, { useEffect, useState } from 'react'

import { Form, Row, type MenuProps } from 'antd'

import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, ColWrapper, TableWrapper } from '@/components/Wrapper'

import PageMenuModal from '../manage'
import { ListData } from '../static/data'

const RolesListComp = (): JSX.Element => {
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
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={12}>
              <h4 className="ant-card-head-title">Roles</h4>
            </ColWrapper>
            <ColWrapper md={12} className="text-right">
              <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                New
              </ButtonWrapper>
            </ColWrapper>
          </Row>
        )}
        dataSource={ListData}
        columns={columns}
      />
      {openManageModal && <PageMenuModal openModal={openManageModal} setOpenModal={setManageModal} />}
    </div>
  )
}

export default RolesListComp
