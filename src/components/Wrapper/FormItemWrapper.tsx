import { Form } from 'antd'
import React from 'react'

import type { FormItemProps } from 'antd'

const FormItemWrapper: React.FC<FormItemProps> = props => {
  return <Form.Item {...props}>{props.children}</Form.Item>
}

export default FormItemWrapper
