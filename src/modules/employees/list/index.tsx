/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { Col, Divider, Row, Tag, Typography, type TableProps } from 'antd'
import type { MenuProps } from 'antd'

import InfoTooltip from '@/components/Common/InfoTooltip'
import TableActionButton from '@/components/Common/TableActionButton'
import ViewDetailsModal from '@/components/Common/ViewDetailsModal'
import { ButtonWrapper, ColWrapper, InputSearchWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

import PartiesManageComp from '../manage'
import { listData } from '../static/data'
import EmployeesManageComp from '../manage'
import { ListDataTypes } from '../types'
import { title } from 'process'
import { render } from 'sass'
import { startCase, upperFirst } from 'lodash'

const EmployeesListComp = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [openManageModal, setManageModal] = useState<boolean>(false)
  const [openVDModal, setVDModal] = useState<boolean>(false)
  const [openAPModal, setAPModal] = useState<boolean>(false)
  const [openRSPModal, setRSPModal] = useState<boolean>(false)

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
      label: 'Mark Attendance',
      key: 'mark_attendance',
      onClick: () => setAPModal(true),
    },
    {
      label: 'Manage Payment',
      key: 'manage_payment',
      onClick: () => setRSPModal(true),
    },
    {
      label: 'Salary History',
      key: 'salary_history',
      onClick: () => setRSPModal(true),
    },
    {
      type: 'divider',
    },
    {
      label: 'View Payslip',
      key: 'payslip',
      onClick: () => setRSPModal(true),
    },
    {
      label: 'Deactivate',
      key: 'deactivate',
      className: 'text-danger',
    },
  ]

  // render the party types with highlighted color
  const partyTypes = (type: string): JSX.Element => {
    if (type === 'supplier') {
      return <Tag color="#2db7f5">{type}</Tag>
    } else if (type === 'customer') {
      return <Tag color="#626262">{type}</Tag>
    }
    return <Tag color="#87d068">{type}</Tag>
  }

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
      render: text => <strong>{startCase(text)}</strong>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>{upperFirst(status)}</Tag>
      ),
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
      <TableWrapper columns={columns} dataSource={listData} title={() => (
        <Row justify={'space-between'}>
          <ColWrapper md={12}>
            <h3 className="fw-bold">Employees</h3>
          </ColWrapper>
          <ColWrapper md={12} className="text-right">
            <div className="d-flex">
              <InputSearchWrapper placeholder="Search by category or mobile..." onChange={e => setSearchValue(e.target.value)} />
              <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                New
              </ButtonWrapper>
            </div>
          </ColWrapper>
        </Row>
      )} />
      {openManageModal && <EmployeesManageComp {...{ openModal: openManageModal, setOpenModal: setManageModal }} />}
      {openVDModal && <ViewDetailsModal {...{ openModal: openVDModal, setOpenModal: setVDModal }} />}
    </>
  )
}

export default EmployeesListComp
