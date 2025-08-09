import React from 'react'

import { Form } from 'antd'

import type { TabProps } from '../../types'

const AdditionalTab = ({ form }: TabProps): JSX.Element => {
  const formValues = Form.useWatch([], form)
  // eslint-disable-next-line no-console
  console.log('===formValues', formValues)
  return <div>{JSON.stringify(formValues)}</div>
}

export default AdditionalTab
