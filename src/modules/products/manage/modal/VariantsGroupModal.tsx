/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'

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
  SelectWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'

import FormWrapper from '@/components/Wrapper/FormWrapper'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { generateSku } from '@/utils/productUtils'

import PriceCard from '../Components/PriceCard'
import { setPrimaryMediaHandler } from '../utils/setPrimaryHandler'

interface FieldsArrType {
  name: string
  label: React.ReactNode
  rules?: Rule[]
  initialValue?: string | number
  colSpan?: number
  fieldsProps?: {
    value?: string | number
    readOnly?: boolean
    addonAfter?: string | React.ReactNode
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
  const variantsArr = Form.useWatch('variantOptions', form)

  const [groupForm] = Form.useForm()
  const showOnlySelected = Form.useWatch(['showOnlySelected'], groupForm)
  const mediaIdArr = Form.useWatch(['variantCombinations', selectedIndex, 'mediaIds'], groupForm)

  useEffect(() => {
    groupForm.setFieldsValue(selectedList)
  }, [selectedList])

  // filter media files based on mediaIds
  const uploadedMediaArr = showOnlySelected
    ? mediaFilesArr?.filter((media: VariantMedia) => mediaIdArr?.includes(media?.fileId))
    : mediaFilesArr

  const productName = form.getFieldValue('title')
  const skuValue = generateSku(productName, selectedList?.label as string)

  const closeModal = (): void => modalCloseHandler(setOpenModal)

  const fieldsArr: FieldsArrType[] = [
    {
      name: 'sku',
      label: <InfoTooltip title="Available product in stock">SKU</InfoTooltip>,
      initialValue: skuValue,
      colSpan: 24,
      fieldsProps: {
        readOnly: true,
      },
    },
    {
      name: 'inStock',
      label: 'In Stock',
      colSpan: 12,
      initialValue: 'true',
    },
    {
      name: 'available',
      label: 'Available',
      colSpan: 12,
      rules: requiredFieldRules,
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

  const onFinish = (values: any): void => {
    form.setFieldValue(['variantCombinations', selectedIndex], values)
    closeModal()
  }

  return (
    <ModalWrapper
      open={openModal}
      onCancel={closeModal}
      title={`Variants: ${selectedList?.label}`}
      width={600}
      footer={
        <SubmitButtonWrapper
          okButtonProps={{ loading: false, onClick: () => groupForm.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <FormWrapper form={groupForm} onFinish={onFinish}>
        {/* ==== price card ==== */}
        {!selectedList?.parent || variantsArr?.length === 1 ? (
          <PriceCard form={groupForm} entity="variants" />
        ) : null}
        {/* ==== dynamically fields ==== */}
        <Row gutter={COMMON_ROW_GUTTER} className="mt-3">
          {!selectedList?.parent || variantsArr?.length === 1
            ? fieldsArr?.map((item: FieldsArrType) => (
                <ColWrapper md={item.colSpan} key={item.name}>
                  <FormItemWrapper
                    name={item.name}
                    label={item.label}
                    rules={item.rules}
                    initialValue={item.initialValue}
                  >
                    {item.name === 'inStock' ? (
                      <SelectWrapper
                        placeholder="Select In Stock"
                        options={[
                          { value: 'true', label: 'Yes' },
                          { value: 'false', label: 'No' },
                        ]}
                        {...item.fieldsProps}
                      />
                    ) : (
                      <InputNumberWrapper {...item.fieldsProps} />
                    )}
                  </FormItemWrapper>
                </ColWrapper>
              ))
            : null}
          {(selectedList?.parent || variantsArr?.length === 1) && (
            <ColWrapper md={24}>
              <FormItemWrapper
                name={'mediaIds'}
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
