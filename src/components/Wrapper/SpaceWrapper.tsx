import React from 'react'

import { Space, type SpaceProps } from 'antd'

interface customSpaceProps extends SpaceProps {
  label?: string
}

const SpaceWrapper: React.FC<customSpaceProps> = props => {
  return <Space {...props}>{props.children}</Space>
}

export default SpaceWrapper
