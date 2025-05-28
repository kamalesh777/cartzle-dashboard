import React, { useEffect, useState } from 'react'

import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, type InputProps } from 'antd'

interface PropTypes extends InputProps {
  loading?: boolean
  debounceTime?: number // optional debounce duration in ms
}

const InputSearchWrapper = ({ onChange, debounceTime = 600, ...props }: PropTypes): JSX.Element => {
  const [value, setValue] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onChange) {
        // Simulate the native Input event
        onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
      }
    }, debounceTime)

    return () => clearTimeout(handler)
  }, [value, debounceTime, onChange])

  return (
    <Input
      suffix={value ? <CloseOutlined onClick={() => setValue('')} /> : <SearchOutlined />}
      placeholder={props?.placeholder || 'Search...'}
      value={value}
      onChange={e => setValue(e.target.value)}
      {...props}
    />
  )
}

export default InputSearchWrapper
