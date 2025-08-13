import React from 'react'

import { Form } from 'antd'

import type { TabProps } from '../../types'

import { CardWrapper } from '@/components/Wrapper'

import SeoViewCard from '../seo/SeoViewCard'

const AdditionalTab = ({ form }: TabProps): JSX.Element => {
  const formValues = Form.useWatch([], form)
  // eslint-disable-next-line no-console
  console.log('===formValues', formValues)
  return (
    <CardWrapper bottomBorderNone>
      <SeoViewCard form={form} />
    </CardWrapper>
  )
}

export default AdditionalTab
