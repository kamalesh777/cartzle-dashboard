import React from 'react'

import { DatePicker, Row, Select, Tag } from 'antd'
import dayjs from 'dayjs'

import type { ModalPropTypes } from 'src/types/common'

import {
  ButtonWrapper,
  ColWrapper,
  ModalWrapper,
  SelectWrapper,
  SpaceWrapper,
  TableWrapper,
} from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions'

import { SalaryHistorydata } from '../static/data'

const { RangePicker } = DatePicker
const { Option } = Select

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
    <ModalWrapper
      open={openModal}
      title={`Salary History - ABC`}
      onCancel={closeModal}
      footer={
        <ButtonWrapper type="primary" onClick={closeModal}>
          Close
        </ButtonWrapper>
      }
      width={900}
    >
      <Row gutter={COMMON_ROW_GUTTER} className="my-3">
        <ColWrapper md={24}>
          <SpaceWrapper>
            Filter:
            <RangePicker />
            <SelectWrapper
              // allowClear
              style={{ width: 150 }}
              placeholder="Quick Filter"
            >
              <Option value={1}>Last 1 Month</Option>
              <Option value={3}>Last 3 Months</Option>
              <Option value={6}>Last 6 Months</Option>
              <Option value={12}>Last 1 Year</Option>
            </SelectWrapper>
          </SpaceWrapper>
        </ColWrapper>
      </Row>
      <TableWrapper dataSource={SalaryHistorydata} columns={columns} />
    </ModalWrapper>
  )
}

export default SalaryHistoryModal
