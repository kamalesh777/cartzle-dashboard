import dayjs, { type Dayjs } from 'dayjs'

import { startCase } from 'lodash'

import type { RangePickerProps } from 'antd/es/date-picker'

// disable currentDate and all day before today
/**
 * Create a reusable disabledDate function for Ant Design DatePicker/RangePicker
 * @param direction - 'before' or 'after'
 * @param days - number of days to shift from today
 */
export const getDisabledDate = (direction: 'before' | 'after', days = 0): RangePickerProps['disabledDate'] => {
  return (current: Dayjs): boolean => {
    if (!current) return false

    const today = dayjs().startOf('day')

    if (direction === 'before') {
      return current.isBefore(today.subtract(days, 'day'), 'day')
    }
    return current.isAfter(today.add(days, 'day'), 'day')
  }
}

export const getSelectOption = (arr: string[]): Array<Record<string, string>> => {
  return arr.map(item => ({ label: startCase(item), value: item }))
}
