import React from 'react';
import { Modal, Table, Tag, Typography } from 'antd';
import { PaymentHistoryData } from '../static/data';
import { ButtonWrapper, ModalWrapper, TableWrapper } from '@/components/Wrapper';
import { ModalPropTypes } from 'src/types/common';
import { modalCloseHandler } from '@/utils/commonFunctions';
import form from 'antd/es/form';

const { Title, Text } = Typography;

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (type: string) => {
      let color = type === 'Refund' ? 'blue' : type === 'Advance' ? 'gold' : 'default';
      return <Tag color={color}>{type}</Tag>;
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: (amt: number) =>
      <Text type={amt < 0 ? 'danger' : undefined}>
        ₹{new Intl.NumberFormat('en-IN').format(amt)}
      </Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: string) => {
      if (!status) return '--';
      const color = status === 'Paid' ? 'green' : 'red';
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: 'Method',
    dataIndex: 'method',
    render: (method: string) => method || '--',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
  },
];

const PaymentHistoryModal = ({ openModal, setOpenModal }: ModalPropTypes<never>) => {

  const closeModal = (): void => modalCloseHandler(setOpenModal)
  return (
    <ModalWrapper
      title="Payment History"
      open={openModal}
      onCancel={closeModal}
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