/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'

import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons'

import type { ColumnTitleProps } from 'antd/lib/table/interface'

export interface SortQueryObject {
  sort: string
  sortOrder: string
}
interface PropType<T> {
  sortName: string
  props?: ColumnTitleProps<T>
  onSortChange: (obj?: SortQueryObject, str?: string) => void
  children: React.ReactNode
  showIcon?: boolean
}
/** Please Note */
// sortName and column key should be same

/**
 * Common sort wrapper component
 * @param children - React node
 * @param sortName - Sort name
 * @param props - Column title props
 * @param onSortChange - Sort change handler
 * @param showIcon - Show icon
 * @returns JSX.Element
 * example
 * <CommonSortWrapper
 *   sortName="name"
 *   onSortChange={(obj, str) => console.log(obj, str)}
 * >
 *   Name
 * </CommonSortWrapper>
 */
const CommonSortWrapper = <T,>({
  children,
  sortName,
  props,
  onSortChange,
  showIcon = true,
}: PropType<T>): JSX.Element => {
  const { sortColumns } = props ?? {}

  const sortedOrder = sortColumns?.find(({ column }) => column.key === sortName)?.order
  const toggleSort = (): void => {
    const nextOrder = sortedOrder === 'ascend' ? 'desc' : 'asc'
    const queryString = `sort=${sortName}&sort_order=${nextOrder}`
    const queryObject = { sort: sortName, sortOrder: nextOrder }
    onSortChange(queryObject, queryString)
  }

  return (
    <div className="d-flex justify-content-start align-items-center">
      <span
        className={`d-flex justify-content-start align-items-center ${showIcon ? 'cursor-pointer' : ''}`}
        onClick={showIcon ? toggleSort : undefined}
      >
        <div>{children}</div>
        {showIcon ? (
          <div className="ml-2">
            {sortedOrder != null &&
              (sortedOrder === 'ascend' ? (
                <CaretUpFilled className="default-color" />
              ) : (
                <CaretDownFilled className="default-color" />
              ))}
          </div>
        ) : (
          <></>
        )}
      </span>
    </div>
  )
}

export default CommonSortWrapper
