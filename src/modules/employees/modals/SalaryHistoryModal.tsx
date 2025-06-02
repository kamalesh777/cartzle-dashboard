import React from 'react'

import { Tag } from 'antd'
import dayjs from 'dayjs'

import type { ModalPropTypes } from 'src/types/common'

import { ModalWrapper, TableWrapper } from '@/components/Wrapper'
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions'

import { SalaryHistorydata } from '../static/data'

const SalaryHistoryModal: React.FC<ModalPropTypes<never>> = ({ openModal, setOpenModal }) => {
  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD MMM YYYY'),
    },
    {
      title: 'Type',
      dataIndex: 'payment_type',
      key: 'payment_type',
      render: (type: string) => <Tag color={type === 'salary' ? 'green' : 'gold'}>{type.toUpperCase()}</Tag>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₹${getDecimal(amount)}`,
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
  ]

  return (
    <ModalWrapper open={openModal} title={`Salary History - ABC`} onCancel={closeModal} footer={null} width={700}>
      <TableWrapper dataSource={SalaryHistorydata} columns={columns} />
    </ModalWrapper>
  )
}

export default SalaryHistoryModal
