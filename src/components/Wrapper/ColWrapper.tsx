import React from 'react'

import { Col } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { ColProps } from 'antd'

interface CustomButtonProps extends ColProps {
  label?: string
}

const ColWrapper: React.FC<CustomButtonProps> = props => {
  return (
    <Col span={24} {...props}>
      {props.children}
    </Col>
  )
}

export default ColWrapper
