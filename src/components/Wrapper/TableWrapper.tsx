import React from 'react'

import { Table, type TableProps } from 'antd'

import type { AnyObject } from 'antd/es/_util/type'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

// type AnyObject = Record<string, unknown>

export interface CustomTableProps<T> extends TableProps<T> {
  size?: 'large' | 'middle' | 'small'
}

const TableWrapper = <T extends AnyObject>(props: CustomTableProps<T>): JSX.Element => {
  const { columns, ...resProps } = props
  const tableColumns = columns?.map(item => {
    return {
      render: (value: string | number) => value || EMPTY_PLACEHOLDER,
      ...item,
      ellipsis: item.ellipsis ?? true,
    }
  })
  return (
    <Table<T>
      {...resProps}
      columns={tableColumns}
      className={`common-table-height table-pagination-position ${props.className}`}
    />
  )
}

export default TableWrapper
