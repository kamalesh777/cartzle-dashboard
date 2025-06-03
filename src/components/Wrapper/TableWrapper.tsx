import React from 'react'

import { Table, type TableColumnsType, type TableProps } from 'antd'

import type { AnyObject } from 'antd/es/_util/type'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'
import useDevice from '@/hook/useDevice'

// type AnyObject = Record<string, unknown>

export interface CustomTableProps<T> extends TableProps<T> {
  size?: 'large' | 'middle' | 'small'
}

const TableWrapper = <T extends AnyObject>(props: CustomTableProps<T>): JSX.Element => {
  const { isMobileDevice, tableScroll } = useDevice()
  const { columns, ...resProps } = props

  const tableColumns = columns?.map(item => {
    // checking action column and mobile device
    const isMobileAction = item?.key === 'action' && isMobileDevice
    return {
      render: (value: string | number) => value || EMPTY_PLACEHOLDER,
      ...item,
      ellipsis: item.ellipsis ?? true,
      fixed: isMobileAction ? 'right' : item?.fixed,
      width: isMobileAction ? '50px' : item?.width,
    }
  })
  return (
    <Table<T>
      {...resProps}
      scroll={tableScroll}
      columns={tableColumns as TableColumnsType}
      className={`common-table-height table-pagination-position ${props.className}`}
    />
  )
}

export default TableWrapper
