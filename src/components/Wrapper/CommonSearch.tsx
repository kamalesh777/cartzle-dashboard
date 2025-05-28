import React from 'react'

import { SearchOutlined } from '@ant-design/icons'

import { Input, type InputProps } from 'antd'

interface PropTypes extends InputProps {
  loading?: boolean
}

const CommonSearchComp = (props: PropTypes): JSX.Element => {
  return <Input suffix={<SearchOutlined />} placeholder={props?.placeholder || 'Search...'} />
}

export default CommonSearchComp
