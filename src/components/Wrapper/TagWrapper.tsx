import React from 'react'

import { Tag, type TagProps } from 'antd'

interface customTagProps extends TagProps {
  label?: string
}

const TagWrapper: React.FC<customTagProps> = props => {
  return <Tag {...props}>{props.children}</Tag>
}

export default TagWrapper
