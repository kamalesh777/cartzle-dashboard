/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { Col, Row, Tag, type TableProps } from 'antd'

import type { ListDataTypes } from '../types'
import type { MenuProps } from 'antd'

import TableActionButton from '@/components/Common/TableActionButton'
import ViewDetailsModal from '@/components/Common/ViewDetailsModal'
import { ButtonWrapper, InputSearchWrapper, TableWrapper } from '@/components/Wrapper'

import PartiesManageComp from '../manage'
import ExpenseReport from '../modals/ExpensesReport'
import { listData } from '../static/data'

const ExpensesListComp = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')
  const [openManageModal, setManageModal] = useState<boolean>(false)
  const [openVDModal, setVDModal] = useState<boolean>(false)
  const [openExpReModal, setExpReModal] = useState<boolean>(false)

  const items: MenuProps['items'] = [
    {
      label: 'Update',
      key: 'update',
      onClick: () => setManageModal(true),
    },
    {
      label: 'View Details',
      key: 'view_details',
      onClick: () => setVDModal(true),
    },
    {
      label: 'Exp. Report',
      key: 'exp_report',
      onClick: () => setExpReModal(true),
    },
    {
      type: 'divider',
    },
    {
      label: 'Delete',
      key: 'delete_expenses',
      className: 'text-danger',
    },
  ]

  // table columns parties list
  const columns: TableProps<ListDataTypes>['columns'] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => <Tag color="purple">{category}</Tag>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '25%',
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => `₹${amount.toFixed(2)}`,
    },
    {
      title: 'Paid Method',
      dataIndex: 'payment_method',
      render: payment_method => <Tag color="blue">{payment_method}</Tag>,
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: () => <TableActionButton items={items} />,
    },
  ]

  return (
    <>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        title={() => (
          <Row justify={'space-between'}>
            <Col md={12}>
              <h3 className="fw-bold">Expenses</h3>
            </Col>
            <Col md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper
                  placeholder="Search by category or amount..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                  Add
                </ButtonWrapper>
              </div>
            </Col>
          </Row>
        )}
      />
      {openManageModal && <PartiesManageComp {...{ openModal: openManageModal, setOpenModal: setManageModal }} />}
      {openVDModal && <ViewDetailsModal {...{ openModal: openVDModal, setOpenModal: setVDModal }} />}
      {openExpReModal && <ExpenseReport {...{ openModal: openExpReModal, setOpenModal: setExpReModal }} />}
    </>
  )
}

export default ExpensesListComp
