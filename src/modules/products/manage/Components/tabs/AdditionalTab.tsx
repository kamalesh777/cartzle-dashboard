import React from 'react'

import { Form } from 'antd'

import type { TabProps } from '../../types'

const AdditionalTab = ({ form }: TabProps): JSX.Element => {
  const formvalues = Form.useWatch([], form)
  // eslint-disable-next-line no-console
  console.log('===formvalues', formvalues)
  return <div>{JSON.stringify(formvalues)}</div>
}

export default AdditionalTab
