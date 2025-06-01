import React, { useState } from 'react';
import { Table, Tag, Space, Button, DatePicker, Select, Row, Col, TableProps } from 'antd';
import dayjs from 'dayjs';
import { ModalPropTypes } from 'src/types/common';
import { ExpensesReportData } from '../static/data';
import { ListDataTypes } from '../types';
import { ButtonWrapper, ColWrapper, ModalWrapper, SelectWrapper, SpaceWrapper, TableWrapper } from '@/components/Wrapper';
import { getDecimal, modalCloseHandler } from '@/utils/commonFunctions';
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ExpenseReport = ({ openModal, setOpenModal }: ModalPropTypes<never>): JSX.Element => {

    const [filteredData, setFilteredData] = useState(ExpensesReportData);
    const [selectedRange, setSelectedRange] = useState(null);

    const handleQuickFilter = (months) => {
        const end = dayjs();
        const start = end.subtract(months, 'month');
        setSelectedRange([start, end]);
        filterData(start, end);
    };

    const handleRangeChange = (dates) => {
        if (!dates) {
            setFilteredData(ExpensesReportData);
            return;
        }
        const [start, end] = dates;
        setSelectedRange([start, end]);
        filterData(start, end);
    };

    const filterData = (start, end): void => {
        const result = ExpensesReportData.filter(item => {
            const itemDate = dayjs(item.date);
            return itemDate.isAfter(start.subtract(1, 'day')) && itemDate.isBefore(end.add(1, 'day'));
        });
        setFilteredData(result);
    };

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
            title: 'Paid By',
            dataIndex: 'payment_method',
            key: 'payment_method',
            render: payment_method => <Tag color="blue">{payment_method}</Tag>,
        },
    ];

    // close modal handler
    const closeModal = (): void => modalCloseHandler(setOpenModal)

    return (
        <ModalWrapper
            title={'Expenses Report'}
            open={openModal}
            onCancel={closeModal}
            width={900}
            footer={
                <ButtonWrapper type='primary' onClick={closeModal}>Close</ButtonWrapper>
            }>
            <Row gutter={COMMON_ROW_GUTTER} className='my-3'>
                <ColWrapper md={24}>
                    <SpaceWrapper>
                        Filter:
                        <RangePicker value={selectedRange} onChange={handleRangeChange} />
                        <SelectWrapper
                            // allowClear
                            style={{ width: 150 }}
                            placeholder="Quick Filter"
                            onChange={(value) => handleQuickFilter(value)}
                        >
                            <Option value={1}>Last 1 Month</Option>
                            <Option value={3}>Last 3 Months</Option>
                            <Option value={6}>Last 6 Months</Option>
                            <Option value={12}>Last 1 Year</Option>
                        </SelectWrapper>
                    </SpaceWrapper>
                </ColWrapper>
            </Row>
            <TableWrapper
                columns={columns}
                dataSource={filteredData}
                bordered
                pagination={{ pageSize: 5 }}
            />
        </ModalWrapper>
    );
};

export default ExpenseReport;