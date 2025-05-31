/* eslint-disable no-duplicate-imports */
'use client'
import React, { useState } from 'react'

import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Divider, Space, Tag, Typography, type TableProps } from 'antd'

import type { ListDataTypes, PaymentPromise } from '../types'
import type { MenuProps } from 'antd'

import { TableWrapper, TooltipWrapper } from '@/components/Wrapper'

import TableActionButton from '@/components/Wrapper/TableActionButton'
import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

import PartiesManageComp from '../manage'
import { listData } from '../static/data'
import ViewDetailsModal from '@/components/Common/ViewDetailsModal'

const UsersListComp = (): JSX.Element => {
  const [openManageModal, setOpenManageModal] = useState<boolean>(false)
  const [openVDModal, setVDModal] = useState<boolean>(false)

  const items: MenuProps['items'] = [
    {
      label: 'Update Details',
      key: 'update_details',
      onClick: () => setOpenManageModal(true),
    },
    {
      label: 'View Details',
      key: 'view_details',
      onClick: () => setVDModal(true),
    },
    {
      label: 'Add Payment',
      key: 'add_payment',
      onClick: () => setOpenManageModal(true),
    },
    {
      label: 'Set Reminder',
      key: 'set_reminder',
      onClick: () => setOpenManageModal(true),
    },
    {
      type: 'divider',
    },
    {
      label: 'Deactivate',
      key: 'deactivate',
      className: 'text-danger'
    },
  ]

  // render the party types with hightlighted color
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
        <Space>
          <Typography.Text copyable={{ icon: [record?.mobile, record?.mobile] }} />
          {record?.alternate_mobile ? (
            <TooltipWrapper
              title={
                <>
                  <p>Alternate Number </p>
                  <Typography.Text copyable={{ icon: [record?.alternate_mobile, record?.alternate_mobile] }} />{' '}
                </>
              }
            >
              <InfoCircleOutlined className="text-primary" />
            </TooltipWrapper>
          ) : (
            ''
          )}
        </Space>
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
          <p className="text-danger">
            {obj1?.promised_date}{' '}
            <TooltipWrapper
              title={arr?.map((obj: PaymentPromise, index: React.Key) => (
                <>
                  <Space align="start" className="w-100">
                    Date: {obj?.promised_date || EMPTY_PLACEHOLDER}
                  </Space>
                  <Space align="start" className="w-100">
                    Amount: {obj?.promised_amount ?? EMPTY_PLACEHOLDER}
                  </Space>
                  <Space align="start" className="w-100">
                    Note: {obj?.note ?? EMPTY_PLACEHOLDER}
                  </Space>
                  {arr?.length - 1 !== index && <Divider className="my-2" />}
                </>
              ))}
            >
              <InfoCircleOutlined className="text-primary" />
            </TooltipWrapper>
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
      <TableWrapper columns={columns} dataSource={listData} title={() => <h3 className="fw-bold">Parties</h3>} />
      <PartiesManageComp {...{ openModal: openManageModal, setOpenModal: setOpenManageModal }} />
      <ViewDetailsModal {...{ openModal: openVDModal, setOpenModal: setVDModal }} />
    </>
  )
}

export default UsersListComp
