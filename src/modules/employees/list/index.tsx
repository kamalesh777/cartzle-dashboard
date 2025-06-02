/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { SyncOutlined } from '@ant-design/icons'
import { Row, Tag, Typography, type TableProps } from 'antd'

import { startCase, upperFirst } from 'lodash'

import type { ListDataTypes } from '../types'
import type { MenuProps } from 'antd'

import InfoTooltip from '@/components/Common/InfoTooltip'
import TableActionButton from '@/components/Common/TableActionButton'
import ViewDetailsModal from '@/components/Common/ViewDetailsModal'
import { ButtonWrapper, ColWrapper, InputSearchWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import EmployeesManageComp from '../manage'
import ManagePaymentModal from '../modals/ManagePayment'
import MarkAttendanceForm from '../modals/MarkAttendanceForm'
import SalaryHistoryModal from '../modals/SalaryHistoryModal'
import { listData } from '../static/data'

const EmployeesListComp = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')
  const [openManageModal, setManageModal] = useState<boolean>(false)
  const [openVDModal, setVDModal] = useState<boolean>(false)
  const [openMarAttanModal, setMarAttanModal] = useState<boolean>(false)
  const [openMPModal, setMPModal] = useState<boolean>(false)
  const [openSHModal, setSHModal] = useState<boolean>(false)

  const moreMenu = (): MenuProps['items'] => [
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
      label: 'Mark Attendance',
      key: 'mark_attendance',
      onClick: () => setMarAttanModal(true),
    },
    {
      label: 'Manage Payment',
      key: 'manage_payment',
      onClick: () => setMPModal(true),
    },
    {
      label: 'Salary History',
      key: 'salary_history',
      onClick: () => setSHModal(true),
    },
    {
      type: 'divider',
    },
    {
      label: (
        <SpaceWrapper>
          <SyncOutlined />
          Action
        </SpaceWrapper>
      ),
      key: 'action',
      className: 'text-danger',
    },
  ]

  // table columns parties list
  const columns: TableProps<ListDataTypes>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      width: '14%',
      render: (_, record) => (
        <SpaceWrapper>
          <Typography.Text copyable={{ icon: [record?.mobile, record?.mobile] }} />
          {record?.alternate_mobile ? (
            <InfoTooltip
              title={
                <>
                  <p>Alternate Number </p>
                  <Typography.Text copyable={{ icon: [record?.alternate_mobile, record?.alternate_mobile] }} />{' '}
                </>
              }
            />
          ) : (
            ''
          )}
        </SpaceWrapper>
      ),
    },
    {
      title: 'Joining Date',
      dataIndex: 'joining_date',
    },
    {
      title: 'Job Type',
      dataIndex: 'job_type',
      render: text => <strong>{startCase(text)}</strong>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: status => <Tag color={status === 'active' ? 'green' : 'gray'}>{upperFirst(status)}</Tag>,
    },
    {
      title: '',
      key: 'action',
      className: 'text-right',
      render: () => <TableActionButton items={moreMenu()} />,
    },
  ]

  return (
    <>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        title={() => (
          <Row justify={'space-between'}>
            <ColWrapper md={12}>
              <h3 className="fw-bold">Employees</h3>
            </ColWrapper>
            <ColWrapper md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper
                  placeholder="Search by category or mobile..."
                  onChange={e => setSearchValue(e.target.value)}
                />
                <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                  New
                </ButtonWrapper>
              </div>
            </ColWrapper>
          </Row>
        )}
      />
      {openManageModal && <EmployeesManageComp {...{ openModal: openManageModal, setOpenModal: setManageModal }} />}
      {openVDModal && <ViewDetailsModal {...{ openModal: openVDModal, setOpenModal: setVDModal }} />}
      {openMarAttanModal && <MarkAttendanceForm {...{ openModal: openMarAttanModal, setOpenModal: setMarAttanModal }} />}
      {openMPModal && <ManagePaymentModal {...{ openModal: openMPModal, setOpenModal: setMPModal }} />}
      {openSHModal && <SalaryHistoryModal {...{ openModal: openSHModal, setOpenModal: setSHModal }} />}
    </>
  )
}

export default EmployeesListComp
