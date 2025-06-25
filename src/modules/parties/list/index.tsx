/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { Divider, Row, Tag, Typography, type TableProps } from 'antd'

import type { ListDataTypes, PaymentPromise } from '../types'
import type { MenuProps } from 'antd'

import InfoTooltip from '@/components/Common/InfoTooltip'
import TableActionButton from '@/components/Common/TableActionButton'
import ViewDetailsModal from '@/components/Common/ViewDetailsModal'
import { ButtonWrapper, ColWrapper, InputSearchWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

import PartiesManageComp from '../manage'
import AddPaymentModal from '../modals/AddPaymentModal'
import PaymentHistoryModal from '../modals/PaymentHistoryModal'
import ReschedulePayment from '../modals/ReschedulePayment'
import { listData } from '../static/data'

const UsersListComp = (): JSX.Element => {
  const [, setSearchValue] = useState<string>('')
  const [openManageModal, setManageModal] = useState<boolean>(false)
  const [openVDModal, setVDModal] = useState<boolean>(false)
  const [openAPModal, setAPModal] = useState<boolean>(false)
  const [openRSPModal, setRSPModal] = useState<boolean>(false)
  const [openPHModal, setPHModal] = useState<boolean>(false)

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
      label: 'Add Payment',
      key: 'add_payment',
      onClick: () => setAPModal(true),
    },
    {
      label: 'Reschedule Payment',
      key: 'reschedule_payment',
      onClick: () => setRSPModal(true),
    },
    {
      label: 'Payment History',
      key: 'payment_history',
      onClick: () => setPHModal(true),
    },
    {
      type: 'divider',
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
      key: 'name',
      width: '18%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '18%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: '10%',
      className: 'text-capitalize',
      render: type => partyTypes(type),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      width: '14%',
      render: (_, record) => (
        <SpaceWrapper>
          <Typography.Text copyable={{ icon: [record?.mobile, record?.mobile] }} />
          {record?.alternateMobile ? (
            <InfoTooltip
              title={
                <>
                  <p>Alternate Number </p>
                  <Typography.Text copyable={{ icon: [record?.alternateMobile, record?.alternateMobile] }} />{' '}
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
      title: 'Due Amt.',
      dataIndex: 'due_amount',
      width: '10%',
    },
    {
      title: 'Due Date',
      width: '15%',
      dataIndex: 'payment_promises',
      render: arr => {
        const obj1 = arr?.[0] as PaymentPromise
        return obj1 ? (
          <p>
            {obj1?.promisedDate}{' '}
            <InfoTooltip
              title={arr?.map((obj: PaymentPromise, index: React.Key) => (
                <>
                  <SpaceWrapper align="start" className="w-100">
                    Date: {obj?.promisedDate || EMPTY_PLACEHOLDER}
                  </SpaceWrapper>
                  <SpaceWrapper align="start" className="w-100">
                    Amount: {obj?.promisedAmount ?? EMPTY_PLACEHOLDER}
                  </SpaceWrapper>
                  <SpaceWrapper align="start" className="w-100">
                    Note: {obj?.note ?? EMPTY_PLACEHOLDER}
                  </SpaceWrapper>
                  {arr?.length - 1 !== index && <Divider className="my-2" />}
                </>
              ))}
            />
          </p>
        ) : (
          EMPTY_PLACEHOLDER
        )
      },
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
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
            <ColWrapper md={12}>
              <h4 className="ant-card-head-title">Parties</h4>
            </ColWrapper>
            <ColWrapper md={12} className="text-right">
              <div className="d-flex">
                <InputSearchWrapper placeholder="Search by name or phone..." onChange={e => setSearchValue(e.target.value)} />
                <ButtonWrapper type="primary" className="ms-2" onClick={() => setManageModal(true)}>
                  Add
                </ButtonWrapper>
              </div>
            </ColWrapper>
          </Row>
        )}
      />
      {openManageModal && <PartiesManageComp {...{ openModal: openManageModal, setOpenModal: setManageModal }} />}
      {openVDModal && <ViewDetailsModal {...{ openModal: openVDModal, setOpenModal: setVDModal }} />}
      {openAPModal && <AddPaymentModal {...{ openModal: openAPModal, setOpenModal: setAPModal }} />}
      {openRSPModal && <ReschedulePayment {...{ openModal: openRSPModal, setOpenModal: setRSPModal }} />}
      {openPHModal && <PaymentHistoryModal {...{ openModal: openPHModal, setOpenModal: setPHModal }} />}
    </>
  )
}

export default UsersListComp
