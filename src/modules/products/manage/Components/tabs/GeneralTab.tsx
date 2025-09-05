/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'

import { Row, Input, Form, Upload } from 'antd'

import type { CategoryType, TabProps } from '../../types'

// eslint-disable-next-line no-duplicate-imports

import { getRequest } from '@/api/preference/RequestService'
import { InfoTooltip, Toast } from '@/components/Common'
import GalleryModal from '@/components/Gallery'
import MediaItems from '@/components/Gallery/MediaItems'
import {
  ColWrapper,
  CardWrapper,
  FormItemWrapper,
  InputWrapper,
  SelectWrapper,
  ButtonWrapper,
  EmptyWrapper,
} from '@/components/Wrapper'
import VerticalScrollWrapper from '@/components/Wrapper/VerticalScrollWrapper'
import { requiredWithWhitspcFieldRules, CATEGORY_ID, requiredFieldRules } from '@/constants/AppConstant'
import { getSelectOption } from '@/utils/disableFunction'

import OrganizationCard from '../OrganizationCard'
import PriceCard from '../PriceCard'

const GeneralTab = ({ form }: TabProps): JSX.Element => {
  const mediaArr = Form.useWatch('media', form)
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([])

  // fetch category
  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      try {
        const res = await getRequest('/api/category-list')
        if (res.data.success) {
          setCategoriesData(res.data.result)
        }
      } catch (error) {
        Toast('error', (error as Error).message)
      }
    }
    fetchCategory()
  }, [])

  const [openGalleryModal, setOpenGalleryModal] = useState(false)
  return (
    <>
      <Row gutter={24} justify={'space-between'}>
        {/* Left side fields */}
        <ColWrapper md={15}>
          <CardWrapper className="mb-3" title="General" bottomBorderNone>
            <FormItemWrapper name="title" label="Title" rules={requiredWithWhitspcFieldRules}>
              <InputWrapper />
            </FormItemWrapper>
            <FormItemWrapper name="description" label="Description">
              <Input.TextArea rows={4} />
            </FormItemWrapper>
            <FormItemWrapper name={CATEGORY_ID} label="Category" rules={requiredFieldRules} className="mb-2">
              <SelectWrapper options={getSelectOption(categoriesData, ['name', 'id'])} />
            </FormItemWrapper>
            {/* Product media card */}
            {/* <ProductMediaCard form={form} /> */}
          </CardWrapper>
          <PriceCard form={form} />
          <CardWrapper
            classNames={{
              actions: 'bg-gray-100 media-action',
            }}
            actions={[
              <ButtonWrapper
                block
                type="link"
                className="primary-color"
                onClick={() => setOpenGalleryModal(true)}
                key={'upload'}
              >
                <Upload /> Choose Media
              </ButtonWrapper>,
            ]}
          >
            <FormItemWrapper
              name="media"
              label={
                <InfoTooltip title="Choose media for your product from the gallery">
                  General Media
                </InfoTooltip>
              }
              className="mb-1"
            >
              {mediaArr?.length > 0 ? (
                <VerticalScrollWrapper
                  isColumnDir={mediaArr?.length > 4}
                  maxHeight={mediaArr?.length > 9 ? 200 : 100}
                >
                  <MediaItems mediaArr={mediaArr} form={form} />
                </VerticalScrollWrapper>
              ) : (
                <EmptyWrapper
                  bordered={false}
                  imageStyle={{ width: 70, height: 70, margin: 'auto' }}
                  entity="Media"
                  style={{ borderRadius: '8px', marginInline: 0 }}
                  // onClick={() => setOpenGalleryModal(true)}
                />
              )}
            </FormItemWrapper>
          </CardWrapper>
        </ColWrapper>

        {/* Right side fields */}
        <ColWrapper md={9}>
          <CardWrapper title={'Status'} className="mb-3" bottomBorderNone>
            <FormItemWrapper name="status" className="mb-2" initialValue={'draft'}>
              <SelectWrapper options={getSelectOption(['published', 'draft'])} />
            </FormItemWrapper>
          </CardWrapper>

          <OrganizationCard />
        </ColWrapper>
      </Row>
      {openGalleryModal && (
        <GalleryModal
          openModal={openGalleryModal}
          setOpenModal={setOpenGalleryModal}
          form={form}
          namePath="media"
        />
      )}
    </>
  )
}

export default GeneralTab
