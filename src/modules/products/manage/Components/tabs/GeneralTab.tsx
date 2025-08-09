/* eslint-disable no-console */
import React from 'react'

import { Row, Input } from 'antd'

import type { TabProps } from '../../types'

// eslint-disable-next-line no-duplicate-imports

import { InfoTooltip } from '@/components/Common'
import {
  ColWrapper,
  CardWrapper,
  FormItemWrapper,
  InputWrapper,
  SelectWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'
import { COMMON_ROW_GUTTER, requiredWithWhitspcFieldRules } from '@/constants/AppConstant'
import { getSelectOption } from '@/utils/disableFunction'

import OrganizationCard from '../OrganizationCard'
import PriceCard from '../PriceCard'
import ProductMediaCard from '../ProductMediaCard'
import SeoViewCard from '../seo/SeoViewCard'

const GeneralTab = ({ form }: TabProps): JSX.Element => {
  return (
    <Row gutter={COMMON_ROW_GUTTER} justify={'space-between'}>
      {/* Left side fields */}
      <ColWrapper md={14}>
        <CardWrapper className="mb-3">
          <FormItemWrapper name="title" label="Title" rules={requiredWithWhitspcFieldRules}>
            <InputWrapper />
          </FormItemWrapper>
          <FormItemWrapper name="description" label="Description">
            <Input.TextArea rows={4} />
          </FormItemWrapper>
          {/* Product media card */}
          <ProductMediaCard form={form} />
          {/* Meta card */}
          <SeoViewCard form={form} />
        </CardWrapper>
      </ColWrapper>

      {/* Right side fields */}
      <ColWrapper md={10}>
        <CardWrapper title={'Status'} className="mb-3" bottomBorderNone>
          <FormItemWrapper name="status" className="mb-2">
            <SelectWrapper options={getSelectOption(['Published', 'Draft', 'Deleted'])} />
          </FormItemWrapper>
        </CardWrapper>
        <PriceCard form={form} />
        <OrganizationCard />
        <CardWrapper title={'Tags & Collection'} bottomBorderNone>
          <Row gutter={COMMON_ROW_GUTTER}>
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
                className="mb-3"
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

          <FormItemWrapper
            name="tags"
            label={
              <SpaceWrapper>
                Tags
                <InfoTooltip title="Flexible labels for search/filtering eg. Lightweight, Breathable, New Arrival" />
              </SpaceWrapper>
            }
            className="mb-3"
          >
            <SelectWrapper tokenSeparators={[',']} showArrow={false} mode="tags" />
          </FormItemWrapper>
        </CardWrapper>
      </ColWrapper>
    </Row>
  )
}

export default GeneralTab
