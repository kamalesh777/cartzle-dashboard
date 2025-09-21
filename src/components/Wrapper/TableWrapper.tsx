import React from 'react'

import { Button, Table, type TableColumnsType, type TableProps } from 'antd'

import { SquareMinus, SquarePlus } from 'lucide-react'

import type { AnyObject } from 'antd/es/_util/type'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'
import useDevice from '@/hook/useDevice'

// type AnyObject = Record<string, unknown>

export interface CustomTableProps<T> extends TableProps<T> {
  size?: 'large' | 'middle' | 'small'
  rowKey?: string
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
      scroll={tableScroll}
      expandable={{
        indentSize: 30,
        expandIcon: ({ expanded, onExpand, record }) =>
          record?.parent ? (
            expanded ? (
              <Button onClick={e => onExpand(record, e)} type="text">
                <SquareMinus className="fs-5 me-2 primary-color" />
              </Button>
            ) : (
              <Button onClick={e => onExpand(record, e)} type="text">
                <SquarePlus className="fs-5 me-2 primary-color" />
              </Button>
            )
          ) : null,
      }}
      {...resProps}
      columns={tableColumns as TableColumnsType}
      rowKey={props.rowKey ?? 'id'}
      className={`common-table-height table-pagination-position ${props.className}`}
    />
  )
}

export default TableWrapper
