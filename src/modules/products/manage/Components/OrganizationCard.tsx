import React from 'react'

import { Row } from 'antd'

import { InfoTooltip } from '@/components/Common'
import { CardWrapper, ColWrapper, FormItemWrapper, SelectWrapper, SpaceWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

const OrganizationCard = (): JSX.Element => {
  return (
    <CardWrapper title={'Organize & Collection'} bottomBorderNone className="mb-3">
      <Row gutter={COMMON_ROW_GUTTER}>
        <ColWrapper md={12}>
          <FormItemWrapper name="supplierId" label="Supplier">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper name="brandId" label="Brand">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={24}>
          <FormItemWrapper name="type" label="Product Type">
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper
            name="showcase"
            label={
              <SpaceWrapper>
                Showcase
                <InfoTooltip title="Where the product is highlighted, e.g., homepage, sale banner, hero slider." />
              </SpaceWrapper>
            }
          >
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
        <ColWrapper md={12}>
          <FormItemWrapper
            className="mb-2"
            name="collection"
            label={
              <SpaceWrapper>
                Collection
                <InfoTooltip title="A curated group of products, often for seasonal or themed grouping." />
              </SpaceWrapper>
            }
          >
            <SelectWrapper />
          </FormItemWrapper>
        </ColWrapper>
      </Row>
    </CardWrapper>
  )
}

export default OrganizationCard
