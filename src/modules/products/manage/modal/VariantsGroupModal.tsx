/* eslint-disable @next/next/no-img-element */
import React from 'react'

import { StarFilled } from '@ant-design/icons'

import { Checkbox, Form, Row } from 'antd'

import type { VariantCombination, VariantMedia } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'
import type { FormInstance, Rule } from 'antd/es/form'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'
import MoreVertical from '@/components/Common/Icons/MoreVertical'
import {
  CheckBoxWrapper,
  ColWrapper,
  DropdownWrapper,
  EmptyWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
} from '@/components/Wrapper'

import FormWrapper from '@/components/Wrapper/FormWrapper'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { CATEGORY_ID, COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { getCurrency } from '@/utils/currency'
import { generateSku } from '@/utils/productUtils'

import { setPrimaryMediaHandler } from '../utils/setPrimaryHandler'

interface FieldsArrType {
  name: string
  label: React.ReactNode
  rules?: Rule[]
  initialValue?: string | number
  fieldsProps?: {
    value?: string | number
    readOnly?: boolean
  }
}

interface Props extends ModalPropTypes<VariantCombination> {
  form: FormInstance
}

const VariantsGroupModal = ({
  openModal,
  setOpenModal,
  selectedList,
  selectedIndex,
  form,
}: Props): JSX.Element => {
  const mediaFilesArr = Form.useWatch('mediaFiles', form)
  const variantsArr = Form.useWatch('variants', form)
  const mediaIdArr = Form.useWatch(['variantCombinations', selectedIndex, 'mediaIds'], form)
  const showOnlySelected = Form.useWatch(['showOnlySelected'], form)

  // const [groupForm] = Form.useForm()

  // filter media files based on mediaIds
  const uploadedMediaArr = showOnlySelected
    ? mediaFilesArr?.filter((media: VariantMedia) => mediaIdArr?.includes(media?.fileId))
    : mediaFilesArr

  const productName = form.getFieldValue('title')
  const skuValue = generateSku(productName, selectedList?.label as string)

  const closeModal = (): void => modalCloseHandler(setOpenModal)
  const renderPrefix = (name: string): string => {
    if (name === 'salePrice' || name === 'costPrice') {
      return getCurrency()
    }
    return ''
  }

  const fieldsArr: FieldsArrType[] = [
    {
      name: 'salePrice',
      label: 'Sale Price',
      rules: requiredFieldRules,
    },
    {
      name: 'costPrice',
      label: 'Cost Price',
      rules: requiredFieldRules,
    },
    {
      name: 'available',
      label: 'Available',
      rules: requiredFieldRules,
    },
    {
      name: 'sku',
      label: <InfoTooltip title="Available product in stock">SKU</InfoTooltip>,
      initialValue: skuValue,
      fieldsProps: {
        readOnly: true,
      },
    },
  ]

  const fileActiveHandler = (uploadedFiles: VariantMedia[], index: number): void => {
    const result = setPrimaryMediaHandler(uploadedFiles, index)
    form.setFieldsValue({ mediaFiles: result })
  }

  const menuItems = (record: VariantMedia, index: number): MenuProps['items'] => {
    return [
      mediaIdArr?.includes(record?.fileId)
        ? {
            key: '1',
            label: 'Set as Primary',
            onClick: () => fileActiveHandler(uploadedMediaArr, index),
          }
        : null,
      {
        key: '2',
        label: 'Preview',
      },
    ]
  }

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={`Variants: ${selectedList?.label}`}
      width={600}
    >
      <FormWrapper form={form}>
        <Row gutter={COMMON_ROW_GUTTER}>
          {!selectedList?.parent || variantsArr?.length === 1
            ? fieldsArr?.map((item: FieldsArrType) => (
                <ColWrapper md={12} key={item.name}>
                  <FormItemWrapper
                    name={['variantCombinations', selectedIndex, item.name]}
                    label={item.label}
                    rules={item.rules}
                    initialValue={item.initialValue}
                  >
                    <InputNumberWrapper prefix={renderPrefix(item.name)} {...item.fieldsProps} />
                  </FormItemWrapper>
                </ColWrapper>
              ))
            : null}
          {(selectedList?.parent || variantsArr?.length === 1) && (
            <ColWrapper md={24}>
              <FormItemWrapper
                name={['variantCombinations', selectedIndex, 'mediaIds']}
                label={
                  <InfoTooltip title="Select media by checking on the checkbox or media preview">
                    Variant Images
                  </InfoTooltip>
                }
              >
                {uploadedMediaArr?.length ? (
                  <Checkbox.Group className="d-flex">
                    <div className="media-list-container w-100">
                      {uploadedMediaArr?.map((media: VariantMedia, index: number) => (
                        <CheckBoxWrapper
                          value={media?.fileId}
                          key={media?.name}
                          className="checkbox-button media-list-wrapper"
                        >
                          <div
                            className={`media-list w-100 ${
                              mediaIdArr?.includes(media?.fileId) ? 'active-border' : ''
                            }`}
                          >
                            <div className="upload-action">
                              {media?.isPrimary ? <StarFilled className="primary-color p-1" /> : <span />}
                              <DropdownWrapper
                                menu={{ items: menuItems(media, index) }}
                                overlayStyle={{ minWidth: '140px' }}
                              >
                                <MoreVertical className="p-1" />
                              </DropdownWrapper>
                            </div>
                            <img
                              src={`${MEDIA_BASE_URL}/${media.fileId}?preview=true&tr=w-100,h-100`}
                              alt={media.name}
                            />
                          </div>
                        </CheckBoxWrapper>
                      ))}
                    </div>
                  </Checkbox.Group>
                ) : (
                  <EmptyWrapper
                    imageStyle={{ width: 100, height: 100, margin: 'auto' }}
                    entity="Media"
                    className="ant-card-bordered p-4 text-center"
                    style={{ borderRadius: '8px' }}
                  />
                )}
              </FormItemWrapper>
              <FormItemWrapper
                name={'showOnlySelected'}
                className="mb-3"
                initialValue={false}
                valuePropName="checked"
              >
                <CheckBoxWrapper>Show only selected media files</CheckBoxWrapper>
              </FormItemWrapper>
            </ColWrapper>
          )}
        </Row>
      </FormWrapper>
    </ModalWrapper>
  )
}

export default VariantsGroupModal
