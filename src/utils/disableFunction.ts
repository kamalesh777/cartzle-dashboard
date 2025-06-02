import dayjs from 'dayjs'

import type { RangePickerProps } from 'antd/es/date-picker'
import { startCase, upperFirst } from 'lodash'

// disable currentDate and all day before today
export const disabledUptoCurrentDate: RangePickerProps['disabledDate'] = (current): boolean => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day')
}

export const getSelectOption = (arr: string[]) => {
  return arr.map(item => ({label: startCase(item), value: item}))
}