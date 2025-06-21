import React, { useEffect } from 'react'

import { Form, type TableColumnsType } from 'antd'

// eslint-disable-next-line no-duplicate-imports

import type { VariantCombination, VariantOptionTypes } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

import { TableActionButton } from '@/components/Common'

import { FormItemWrapper, InputNumberWrapper, TableWrapper } from '@/components/Wrapper'
import { getCurrency } from '@/utils/currency'

import { deduplicateVariants, generateGroupedCombinations } from '../utils/generateGroupedCombinations'
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
      dataIndex: 'price',
      width: '20%',
      render: (_, record) => {
        return (
            <InputNumberWrapper 
            prefix={getCurrency()} 
            defaultValue={record.sell_price} 
            size="small" 
            onChange={(value) => record.sell_price = value} />
        )
      },
    },
    {
      title: 'Cost Price',
      dataIndex: 'price',
      width: '20%',
      render: (_, record) => {
        return (
            <InputNumberWrapper 
            prefix={getCurrency()} 
            defaultValue={record.cost_price} 
            size="small" 
            onChange={(value) => record.cost_price = value} />
        )
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '20%',
      render: (_, record) => (
          <InputNumberWrapper size="small" defaultValue={record.available} onChange={(value) => record.available = value} />
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
    onChange: (selectedRowKeys, selectedRows) => {
      
      console.log('===selectedRowKeys:', selectedRows)
    },
  }

  const rowChangeHandler = (record: VariantCombination) => {
    const currentRecord = {
      ...record,
      children: record.children?.map((child: VariantCombination) => {
        const {children, parent, ...rest} = record
        return {
          ...rest,
          ...child,
        }
      })  
    }
    record.children = currentRecord.children
    const finalData = deduplicateVariants([...variantsTableData, currentRecord])
    form.setFieldValue('variants_table', finalData)
    dispatch(setVariantsTable(finalData)) // updating the variants table in the store
  }
  
  console.log('===variantsTable:', variantsTableData)
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
          onRow={(record) => ({
            onBlur: () => rowChangeHandler(record),
          })}
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
