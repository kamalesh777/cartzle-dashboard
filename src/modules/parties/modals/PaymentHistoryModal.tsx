import React from 'react';
import { Tag, Typography } from 'antd';
import { PaymentHistoryData } from '../static/data';
import { ButtonWrapper, ModalWrapper, TableWrapper } from '@/components/Wrapper';
import { ModalPropTypes } from 'src/types/common';
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const PaymentHistoryModal = ({ openModal, setOpenModal }: ModalPropTypes<never>) => {

  const closeModal = (): void => modalCloseHandler(setOpenModal)

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date: string) => dayjs(date).format('DD MMM YYYY, hh:mm A'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type: string) => {
        const color = {
          advance: 'gold',
          normal: 'green',
          refund: 'blue',
          missed: 'red',
        }[type] || 'default';
        return <Tag color={color}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (amt: string) => `₹${getDecimal(amt, true)}`,
    },
    {
      title: 'Method',
      dataIndex: 'method',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
    },
  ];


  return (
    <ModalWrapper
      title="Payment History"
      open={openModal}
      onCancel={closeModal}
      bodyScroll
      footer={
        <ButtonWrapper type='primary' onClick={closeModal}>Close</ButtonWrapper>
      }
      width={900}
    >
      <div style={{ marginBottom: 16 }}>
        <Title level={5}>Ramesh Sutar</Title>
        <Text>Total Order: ₹2,20,000</Text> |{' '}
        <Text type="success">Paid: ₹1,00,000</Text> |{' '}
        <Text type="danger">Due: ₹1,20,000</Text>
      </div>

      <TableWrapper
        columns={columns}
        dataSource={PaymentHistoryData}
        pagination={false}
        rowKey="key"
        bordered
        size="middle"
      />
    </ModalWrapper>
  );
};

export default PaymentHistoryModal;