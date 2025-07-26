import React from 'react'

import { Row } from 'antd'

import type { TabProps } from '../types'

import { ColWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import VariantCardComp from './VariantCard'
import VariantsTable from './VariantsTable'

const VariationTab = ({ form }: TabProps): JSX.Element => {
  return (
    <Row gutter={COMMON_ROW_GUTTER}>
      <ColWrapper md={24}>
        <VariantCardComp form={form} />
      </ColWrapper>
      <ColWrapper md={24}>
        {/* Variants table */}
        <VariantsTable form={form} />
      </ColWrapper>
    </Row>
  )
}

export default VariationTab
