import { Radio } from 'antd'
import React from 'react'

import type { RadioProps } from 'antd'

interface customRadioProps extends RadioProps {
  label?: string
}

const RadioWrapper: React.FC<customRadioProps> = props => {
  return <Radio {...props}>{props.children}</Radio>
}

export default RadioWrapper
