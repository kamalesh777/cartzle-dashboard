import React from 'react'

import { Form } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormProps } from 'antd'

interface FormWrapperProps extends FormProps {
  children: React.ReactNode
}

const FormWrapper = ({ children, ...props }: FormWrapperProps): JSX.Element => {
  return (
    <Form layout="vertical" scrollToFirstError {...props}>
      {children}
    </Form>
  )
}

export default FormWrapper
