import React, { useEffect } from 'react'

import { Form, type TableColumnsType } from 'antd'

// eslint-disable-next-line no-duplicate-imports

import type { VariantCombination, VariantItem, VariantOptionTypes } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

import { TableActionButton } from '@/components/Common'

import { FormItemWrapper, InputNumberWrapper, TableWrapper } from '@/components/Wrapper'
import { getCurrency } from '@/utils/currency'

import { generateGroupedCombinations } from '../utils/generateGroupedCombinations'
import VariantsGroupModal from '../modal/VariantsGroupModal'
import { setVariantsTable } from '@/store/slices/variantsSlice'
import { useDispatch } from 'react-redux'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const dispatch = useDispatch()
  const variants = Form.useWatch('variants', form)
  const groupBy = Form.useWatch('group_by', form)
  const variantsTableData = Form.useWatch('variants_table', form) || []

  const [openModal, setOpenModal] = React.useState(false)
  const [selectedList, setSelectedList] = React.useState<VariantCombination>()

  useEffect(() => {
    const variantsArr = variants?.filter((variant: VariantOptionTypes) => variant?.op_value?.length > 0)
    // check if variantsArr is not empty
    if (variantsArr?.length) {
      const data = generateGroupedCombinations(variantsArr, groupBy)
      form.setFieldValue('variants_table', data)
    } else {
      form.setFieldValue('variants_table', [])
    }
  }, [variants, groupBy])

  // Table columns
  const columns: TableColumnsType<VariantCombination> = [
    {
      title: 'Variant',
      dataIndex: 'label',
      width: '40%',
      className: 'd-flex align-items-center',
    },
    {
      title: 'Sell Price',
      dataIndex: 'sell_price',
      width: '20%',
      render: (_, record) => {
        return (
          <InputNumberWrapper
            prefix={getCurrency()}
            defaultValue={record.sell_price}
            size="small"
            onChange={(value) =>
              rowChangeHandler({ ...record, sell_price: value as number })
            }
          />
        )
      },
    },
    {
      title: 'Cost Price',
      dataIndex: 'cost_price',
      width: '20%',
      render: (_, record) => {
        return (
          <InputNumberWrapper
            prefix={getCurrency()}
            defaultValue={record.cost_price}
            size="small"
            onChange={(value) =>
              rowChangeHandler({ ...record, cost_price: value as number })
            }
          />
        )
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '20%',
      render: (_, record) => (
        <InputNumberWrapper
          prefix={getCurrency()}
          defaultValue={record.available}
          size="small"
          onChange={(value) =>
            rowChangeHandler({ ...record, available: value as number })
          }
        />
      ),
    },
    {
      title: '',
      dataIndex: 'action',
      fixed: 'right',
      width: 50,
      className: 'text-right',
      render: (_, record) => <TableActionButton items={[]} />,
    }
  ]

  // Row click handler
  const rowClick = (record: VariantCombination) => {
    setSelectedList(record)
    setOpenModal(true)
  }

  // Table row selection
  const rowSelection: TableRowSelection<VariantCombination> = {
    checkStrictly: false,
  }

  const rowChangeHandler = (updatedRecord: VariantCombination) => {
    const tableData = variantsTableData || [];
    const finalData = tableData.map((item: VariantCombination) => {
      // Handle updating parent item
      if (item.label === updatedRecord.label && item.parent) {
        return {
          ...item,
          ...updatedRecord,
          children: item.children?.map((child: VariantItem) => ({
            ...child, // Keep existing child values intact
            sell_price: updatedRecord.sell_price,
            cost_price: updatedRecord.cost_price,
            available: updatedRecord.available
          }))
        };
      } // If child row is being updated
      if (!updatedRecord.parent && item.parent) {
        return {
          ...item,
          children: item.children?.map((child: VariantItem) =>
            child.label === updatedRecord.label
              ? { ...child, ...updatedRecord }
              : child
          )
        };
      }
      return item;
    });

    dispatch(setVariantsTable(finalData))
    form.setFieldValue('variants_table', finalData);
  };
  
 

  return (
    <>
      {/* hidden form item for variants table */}
      <FormItemWrapper name="variants_table" hidden />

      {variantsTableData?.length > 0 ? (
        <TableWrapper
          columns={columns}
          rowKey="label"
          rowSelection={rowSelection}
          dataSource={variantsTableData}
          pagination={false}
        />
      ) : null}
      {
        openModal ? (
          <VariantsGroupModal openModal={openModal} setOpenModal={setOpenModal} selectedList={selectedList} />
        ) : null
      }
    </>
  )
}

export default VariantsTable
