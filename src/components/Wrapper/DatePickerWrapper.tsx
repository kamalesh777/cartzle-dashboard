import React from 'react'

import { DatePicker, type DatePickerProps } from 'antd'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CustomDatePickerProps {
  // Add any additional props you want to define here
}

const DatePickerWrapper: React.FC<CustomDatePickerProps & DatePickerProps> = props => {
  return <DatePicker {...props} />
}

export default DatePickerWrapper
