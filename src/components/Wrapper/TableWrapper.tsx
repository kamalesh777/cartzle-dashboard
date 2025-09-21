import React from 'react'

import { Table, type TableColumnsType, type TableProps } from 'antd'

import { SquareMinus, SquarePlus } from 'lucide-react'

import type { AnyObject } from 'antd/es/_util/type'

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'
import useDevice from '@/hook/useDevice'

import ButtonWrapper from './ButtonWrapper'

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
              <ButtonWrapper onClick={e => onExpand(record, e)} noStyle>
                <SquareMinus className="primary-color mt-2 lucide-icon-1-3" />
              </ButtonWrapper>
            ) : (
              <ButtonWrapper onClick={e => onExpand(record, e)} noStyle>
                <SquarePlus className="primary-color mt-2 lucide-icon-1-3" />
              </ButtonWrapper>
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
