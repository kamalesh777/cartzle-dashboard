import React from 'react'

import { Space, type SpaceProps } from 'antd'

interface customRadioProps extends SpaceProps {
  label?: string
}

const SpaceWrapper: React.FC<customRadioProps> = props => {
  return <Space {...props}>{props.children}</Space>
}

export default SpaceWrapper
