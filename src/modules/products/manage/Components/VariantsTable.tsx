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

import { generateGroupedCombinations } from '../utils/generateGroupedCombinations'
import VariantsGroupModal from '../modal/VariantsGroupModal'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const variants = Form.useWatch('variants', form)
  const groupBy = Form.useWatch('group_by', form)
  const variantsTable = Form.useWatch('variants_table', form)

  const [computedVariants, setComputedVariants] = React.useState<VariantCombination[]>([])
  const [openModal, setOpenModal] = React.useState(false)
  const [selectedList, setSelectedList] = React.useState<VariantCombination>()  

  useEffect(() => {
    const variantsArr = variants?.filter((variant: VariantOptionTypes) => variant?.op_value?.length > 0)
    // check if variantsArr is not empty
    if (variantsArr?.length) {
      const data = generateGroupedCombinations(variantsArr, groupBy)
      setComputedVariants(data as VariantCombination[])
    } else {
      setComputedVariants([])
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
            <InputNumberWrapper prefix={getCurrency()} defaultValue={record.sell_price} size="small" onChange={(value) => record.sell_price = value} />
        )
      },
    },
    {
      title: 'Cost Price',
      dataIndex: 'price',
      width: '20%',
      render: (_, record) => {
        return (
            <InputNumberWrapper prefix={getCurrency()} defaultValue={record.cost_price} size="small" onChange={(value) => record.cost_price = value} />
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

  console.log("===selectedList:", selectedList)

  // Table row selection
  const rowSelection: TableRowSelection<VariantCombination> = {
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      
      console.log('===selectedRowKeys:', selectedRows)
    },
  }

  const rowChangeHandler = (record: VariantCombination) => {
    const variantsTable = {
      ...record,
      children: record.children?.map((child: VariantCombination) => {
        const {children, parent, ...rest} = record
        return {
          ...rest,
          ...child,
        }
      })  
    }
    record.children = variantsTable.children
    form.setFieldValue('variants_table', variantsTable)
  }
  
  console.log('===variantsTable:', variantsTable)
  return (
    <>
    {/* hidden form item for variants table */}
    <FormItemWrapper name="variants_table" hidden />

      {computedVariants?.length > 0 ? (
        <TableWrapper
          columns={columns}
          rowKey="label"
          rowSelection={rowSelection}
          dataSource={computedVariants}
          // expandable={expandable}
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
