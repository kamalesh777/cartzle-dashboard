'use client'
import React, { useEffect, useState } from 'react'

import { Form, Row, type MenuProps, type TableProps } from 'antd'

import type { ListDataTypes } from '../types'

import { TableActionButton } from '@/components/Common'
import { ButtonWrapper, ColWrapper, TableWrapper } from '@/components/Wrapper'

import PageMenuModal from '../manage'
import { listData } from '../static/data'

const RolesListComp = (): JSX.Element => {
  // const [form] = Form.useForm()

  const [openManageModal, setManageModal] = useState<boolean>(false)

  const supposeObject = {
    page: 'Puja',
    cards: ['card1', 'card2', 'ayushi'],
  }

  useEffect(() => {
    if (supposeObject) {
      // form.setFieldsValue(supposeObject)
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

  const columns: TableProps<ListDataTypes>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Used Count',
      dataIndex: 'user_count',
      key: 'user_count',
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
        dataSource={listData}
        columns={columns}
      />
      {openManageModal && <PageMenuModal openModal={openManageModal} setOpenModal={setManageModal} />}
    </div>
  )
}

export default RolesListComp
