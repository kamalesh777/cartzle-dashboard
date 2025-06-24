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

// convert array to select option 

type ParseOption = [string, string] | null;
export type ArrOptions = { [key: string]: string }[] | string[];

export const getSelectOption = (
  arr: ArrOptions | null,
  option?: ParseOption
): Array<{ label: string; value: string }> => {
  if (!arr) return []
  return arr.map((item) => {
    if (Array.isArray(option) && typeof item === 'object' && item !== null) {
      const labelValue = item[option[0]];
      const valueValue = item[option[1]];
      return {
        label: startCase(labelValue),
        value: valueValue
      };
    }

    // fallback if item is a string
    const strItem = item as string;
    return {
      label: startCase(strItem),
      value: strItem
    };
  });
};


