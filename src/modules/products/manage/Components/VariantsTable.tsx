import React, { useEffect } from 'react'

import { Form, type TableColumnsType } from 'antd'

// eslint-disable-next-line no-duplicate-imports

import type { GroupedVariant, VariantOptionTypes } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

import { TableActionButton } from '@/components/Common'
import { TableWrapper } from '@/components/Wrapper'

import { computeVariants } from '../utils/comuteVariants'

interface PropTypes {
  form: FormInstance
}

const VariantsTable = ({ form }: PropTypes): JSX.Element | null => {
  const variants = Form.useWatch('variants', form)
  const groupBy = Form.useWatch('group_by', form)

  const [computedVariants, setComputedVariants] = React.useState<GroupedVariant[]>([])

  useEffect(() => {
    const variantsArr = variants?.filter((variant: VariantOptionTypes) => variant?.op_value?.length > 0)
    // check if variantsArr is not empty
    if (variantsArr?.length) {
      const computedVariants = computeVariants(variantsArr, groupBy)
      setComputedVariants(computedVariants as GroupedVariant[])
    } else {
      setComputedVariants([])
    }
  }, [variants, groupBy])

  // Table columns
  const columns: TableColumnsType<GroupedVariant> = [
    {
      title: 'Variant',
      dataIndex: 'label',
      width: '40%',
      className: 'd-flex align-items-center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '25%',
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '15%',
    },
    {
      title: '',
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      className: 'text-right',
      render: () => <TableActionButton items={[]} />,
    },
  ]

  // Table row selection
  const rowSelection: TableRowSelection<GroupedVariant> = {
    onChange: (selectedRowKeys, selectedRows) => {
      // eslint-disable-next-line no-console
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    },
    // onSelect: (record, selected, selectedRows) => {
    //   console.log(record, selected, selectedRows)
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows)
    // },
  }

  return computedVariants?.length > 0 ? (
    <TableWrapper columns={columns} rowKey="label" rowSelection={rowSelection} dataSource={computedVariants} />
  ) : null
}

export default VariantsTable
