import React from 'react'

import { Radio, type RadioProps } from 'antd'

interface customRadioProps extends RadioProps {
  label?: string
}

const RadioWrapper: React.FC<customRadioProps> = props => {
  return <Radio {...props}>{props.children}</Radio>
}

export default RadioWrapper
