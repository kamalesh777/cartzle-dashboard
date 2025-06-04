'use client'
import React, { useEffect, useState } from 'react'

import { Form, Row, type MenuProps, type TableProps } from 'antd'

import { startCase } from 'lodash'

import type { ListDataTypes } from '../types'

import { TableActionButton } from '@/components/Common'
import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, ColWrapper, TableWrapper } from '@/components/Wrapper'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

import PageMenuModal from '../manage'
import { listData } from '../static/data'

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
      title: 'Page Name',
      dataIndex: 'page_name',
    },
    {
      title: 'Cards',
      dataIndex: 'cards_name',
      render: val => (val?.length ? val.map((item: string) => startCase(item)).join(', ') : EMPTY_PLACEHOLDER),
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: () => <TableActionButton items={items} />,
    },
  ]

  const MAIN_COMP = (
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
      dataSource={listData}
      columns={columns}
    />
  )
  return (
    <div id="page-menu">
      <DynamicPageLayout MainComp={MAIN_COMP} />
      {openManageModal && <PageMenuModal openModal={openManageModal} setOpenModal={setManageModal} />}
    </div>
  )
}

export default PageMenuList
