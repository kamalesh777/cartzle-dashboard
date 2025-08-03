/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'

import { Row, Input, Form } from 'antd'

import type { CategoryType, TabProps } from '../../types'

// eslint-disable-next-line no-duplicate-imports
import type { UploadFile } from 'antd'

import { getRequest, postRequest } from '@/api/preference/RequestService'
import { InfoTooltip } from '@/components/Common'
import {
  ColWrapper,
  CardWrapper,
  FormItemWrapper,
  InputWrapper,
  SelectWrapper,
  InputNumberWrapper,
  SpaceWrapper,
} from '@/components/Wrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import {
  COMMON_ROW_GUTTER,
  requiredWithWhitspcFieldRules,
  requiredFieldRules,
  EMPTY_PLACEHOLDER,
} from '@/constants/AppConstant'
import { imageToBase64 } from '@/utils/commonFunctions'
import { getCurrency, getProfitMargin } from '@/utils/currency'
import { getSelectOption } from '@/utils/disableFunction'

const GeneralTab = ({ form }: TabProps): JSX.Element => {
  const costPrice = Form.useWatch('costPrice', form)
  const salePrice = Form.useWatch('salePrice', form)
  const mediaImages = Form.useWatch('media', form)

  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([])
  const [productImages, setProductImages] = useState<{ base64: string; name: string }[]>([])

  // Set profit and margin on cost price and sale price change
  useEffect(() => {
    if (salePrice > costPrice) {
      form.setFieldsValue({
        profit: getProfitMargin(costPrice, salePrice, 'profit'),
        margin: getProfitMargin(costPrice, salePrice, 'margin'),
      })
    } else {
      form.setFieldsValue({
        profit: EMPTY_PLACEHOLDER,
        margin: EMPTY_PLACEHOLDER,
      })
    }
  }, [costPrice, salePrice, form])

  // fetch category
  useEffect(() => {
    const fetchCategory = async (): Promise<void> => {
      try {
        const res = await getRequest('/api/category-list')
        if (res.data.success) {
          setCategoriesData(res.data.result)
        }
      } catch (error) {
        console.log('===error', error)
      }
    }
    fetchCategory()
  }, [])

  const fileUploadHandler = async (fileList: UploadFile[]): Promise<void> => {
    try {
      fileList.forEach(async file => {
        if (file?.status === 'done') {
          const base64 = await imageToBase64(file?.originFileObj as File, 'webp', 0.5)
          setProductImages([...productImages, { base64, name: file.name }])
        }
      })
    } catch (error) {
      console.log('===error', error)
    }
  }

  useEffect(() => {
    const uploadImages = async (): Promise<void> => {
      try {
        const res = await postRequest('/api/product-media-bulk-upload', { images: productImages })
        if (res.data.success) {
          form.setFieldsValue({ media: [] })
        }
      } catch (error) {
        console.log('===error', error)
      }
    }
    if (productImages?.length > 0) {
      uploadImages()
    }
  }, [productImages])

  // const removeFileHandler = (file: UploadFile): void => {
  //   const updatedFiles = mediaImages.filter((item: UploadFile) => item.name !== file.name)
  //   form.setFieldsValue({ media: updatedFiles })
  // }

  console.log('===mediaImages', mediaImages)
  console.log('===productImages', productImages)

  useEffect(() => {
    if (mediaImages?.length > 0) {
      fileUploadHandler(mediaImages)
    }
  }, [mediaImages])

  return (
    <Row gutter={COMMON_ROW_GUTTER} justify={'space-between'}>
      {/* Left side fields */}
      <ColWrapper md={15}>
        <CardWrapper className="mb-3">
          <FormItemWrapper name="title" label="Title" rules={requiredWithWhitspcFieldRules}>
            <InputWrapper />
          </FormItemWrapper>
          <FormItemWrapper name="description" label="Description">
            <Input.TextArea rows={3} />
          </FormItemWrapper>
          <FormItemWrapper name="category" label="Category" rules={requiredFieldRules}>
            <SelectWrapper options={getSelectOption(categoriesData, ['name', 'id'])} />
          </FormItemWrapper>
          <FormItemWrapper
            name="media"
            label="Media"
            className="mb-1"
            getValueFromEvent={obj => obj.fileList}
          >
            <UploadWrapper multiple listType="picture-card" />
          </FormItemWrapper>
        </CardWrapper>
        <CardWrapper title={'Pricing'} className="mb-3">
          <Row gutter={COMMON_ROW_GUTTER}>
            <ColWrapper md={12}>
              <FormItemWrapper name="costPrice" label="Cost Price" rules={requiredFieldRules}>
                <InputNumberWrapper prefix={getCurrency()} />
              </FormItemWrapper>
            </ColWrapper>
            <ColWrapper md={12}>
              <FormItemWrapper
                name="salePrice"
                label="Sale Price"
                dependencies={['costPrice']}
                rules={[
                  ...requiredFieldRules,
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || value > getFieldValue('costPrice')) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Sale price must be > Cost price!'))
                    },
                  }),
                ]}
              >
                <InputNumberWrapper prefix={getCurrency()} />
              </FormItemWrapper>
            </ColWrapper>
            <ColWrapper md={12}>
              <FormItemWrapper name="profit" label="Profit" className="mb-2">
                <InputWrapper readOnly />
              </FormItemWrapper>
            </ColWrapper>
            <ColWrapper md={12}>
              <FormItemWrapper name="margin" label="Margin" className="mb-2">
                <InputNumberWrapper
                  formatter={value => (value !== EMPTY_PLACEHOLDER ? value + '%' : EMPTY_PLACEHOLDER)}
                  readOnly
                />
              </FormItemWrapper>
            </ColWrapper>
          </Row>
        </CardWrapper>
      </ColWrapper>

      {/* Right side fields */}
      <ColWrapper md={9}>
        <CardWrapper title={'Publishing'} className="mb-3">
          <FormItemWrapper name="status" label="Status">
            <SelectWrapper options={getSelectOption(['Active', 'Inactive'])} />
          </FormItemWrapper>
          <FormItemWrapper
            name="showcase"
            label={
              <SpaceWrapper>
                Showcase
                <InfoTooltip title="Select a page where this product will be shown" />
              </SpaceWrapper>
            }
          >
            <SelectWrapper />
          </FormItemWrapper>
          <FormItemWrapper
            className="mb-3"
            name="collection"
            label={
              <SpaceWrapper>
                Collection
                <InfoTooltip title="Select a section where this product will be shown" />
              </SpaceWrapper>
            }
          >
            <SelectWrapper />
          </FormItemWrapper>
        </CardWrapper>
        <CardWrapper title={'Product organization'}>
          <FormItemWrapper name="brand" label="Brand">
            <SelectWrapper />
          </FormItemWrapper>
          <FormItemWrapper name="party" label="Party's Name">
            <SelectWrapper />
          </FormItemWrapper>
          <FormItemWrapper name="type" label="Type">
            <SelectWrapper />
          </FormItemWrapper>

          <FormItemWrapper name="tags" label="Tags" className="mb-3">
            <SelectWrapper tokenSeparators={[',']} showArrow={false} mode="tags" />
          </FormItemWrapper>
        </CardWrapper>
      </ColWrapper>
    </Row>
  )
}

export default GeneralTab
