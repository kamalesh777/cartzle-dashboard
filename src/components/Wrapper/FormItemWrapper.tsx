import React from 'react'

import { Form } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormItemProps } from 'antd'

const FormItemWrapper: React.FC<FormItemProps> = props => {
  return <Form.Item {...props}>{props.children}</Form.Item>
}

export default FormItemWrapper
