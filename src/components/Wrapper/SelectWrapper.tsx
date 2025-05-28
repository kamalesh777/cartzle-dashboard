import React from 'react'

import { Select, type SelectProps } from 'antd'

interface customSelectProps extends SelectProps {
  dummy?: string
}
interface CustomOptionProps {
  title?: string
  disabled?: boolean
  className?: string
  value: string | number | null
  children?: React.ReactNode
}

function SelectWrapper(props: customSelectProps): JSX.Element {
  return (
    <Select placement="bottomRight" dropdownStyle={{ minWidth: '150px' }} {...props}>
      {props.children}
    </Select>
  )
}

function Option(props: CustomOptionProps): JSX.Element {
  return <Select.Option {...props}>{props.children}</Select.Option>
}

SelectWrapper.Option = Option

export default SelectWrapper
