import React from 'react'

import { Row } from 'antd'

import { CardWrapper, ColWrapper, FormItemWrapper, SelectWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

const OrganizationCard = (): JSX.Element => {
  return (
    <CardWrapper title={'Organization'} bottomBorderNone className="mb-3">
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={12}>
          <FormItemWrapper name="supplierId" label="Supplier">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="type" label="Product Type">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={24}>
          <FormItemWrapper name="brandId" label="Brand" className="mb-2">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    </CardWrapper>
  )
}

export default OrganizationCard
