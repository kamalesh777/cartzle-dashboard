import React from 'react'

import { Tag, DatePicker, Select, Row, type TableProps } from 'antd'

import type { ListDataTypes } from '../types'

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

import { ExpensesReportData } from '../static/data'

const { RangePicker } = DatePicker
const { Option } = Select

const ExpenseReport = ({ openModal, setOpenModal }: ModalPropTypes<never>): JSX.Element => {
  // table columns
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
      key: 'description',
    },
    {
      title: 'Amount (₹)',
      dataIndex: 'amount',
      key: 'amount',
      render: amount => `₹${getDecimal(amount)}`,
    },
    {
      title: 'Paid Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: paymentMethod => <Tag color="blue">{paymentMethod}</Tag>,
    },
  ]

  // close modal handler
  const closeModal = (): void => modalCloseHandler(setOpenModal)

  return (
    <ModalWrapper
      title={'Expenses Report'}
      open={openModal}
      onCancel={closeModal}
      width={900}
      footer={
        <ButtonWrapper type="primary" onClick={closeModal}>
          Close
        </ButtonWrapper>
      }
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
      <TableWrapper columns={columns} dataSource={ExpensesReportData} bordered pagination={{ pageSize: 5 }} />
    </ModalWrapper>
  )
}

export default ExpenseReport
