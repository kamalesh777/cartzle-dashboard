/* eslint-disable no-console */
import React from 'react'

import { Form } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormProps } from 'antd'

interface FormWrapperProps extends FormProps {
  children: React.ReactNode
  log?: boolean
}

const FormWrapper = ({ children, log = false, ...props }: FormWrapperProps): JSX.Element => {
  const formData = Form.useWatch([], props.form)
  log && console.log('===formData log', formData)
  return (
    <Form layout="vertical" scrollToFirstError {...props}>
      {children}
    </Form>
  )
}

export default FormWrapper
