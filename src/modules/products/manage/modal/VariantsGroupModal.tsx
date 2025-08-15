/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'

import { StarFilled } from '@ant-design/icons'

import { Checkbox, Form, Row } from 'antd'

import { useDispatch, useSelector } from 'react-redux'

import type { VariantCombination, VariantMedia } from '../types'
import type { RootState } from '@/store/index'
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
import { setVariantsTable } from '@/store/slices/variantsSlice'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { generateSku } from '@/utils/productUtils'

import PriceCard from '../Components/PriceCard'
import { setPrimaryMediaHandler, updateVariantRecursively } from '../utils'

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

const VariantsGroupModal = ({ openModal, setOpenModal, selectedList, form }: Props): JSX.Element => {
  const dispatch = useDispatch()
  const variantsTableState = useSelector((state: RootState) => state.variants.variantsTable)

  // find selected variant by key
  const selectedVariant = variantsTableState?.find(item => item.key === selectedList?.key)
  const mediaState = selectedVariant?.media

  // form instance for the product form
  const mediaFilesArr = Form.useWatch('mediaFiles', form)
  const variantsArr = Form.useWatch('variantOptions', form)

  // form instance for the variant group modal
  const [groupForm] = Form.useForm()
  const showOnlySelected = Form.useWatch(['showOnlySelected'], groupForm)
  const mediaArr = Form.useWatch('media', groupForm) as VariantMedia[]

  useEffect(() => {
    groupForm.setFieldsValue({ ...selectedList, media: mediaState })
  }, [selectedList])

  // filter media files based on media
  const uploadedMediaArr = !showOnlySelected
    ? mediaFilesArr
    : mediaFilesArr?.filter((m: VariantMedia) => mediaArr?.some((i: VariantMedia) => i.fileId === m.fileId))

  const productName = form.getFieldValue('title')
  const skuValue = generateSku(productName, selectedList?.label as string)

  const closeModal = (): void => modalCloseHandler(setOpenModal)

  // set primary media handler
  const fileActiveHandler = (upFiles: VariantMedia[], fileId: string): void => {
    const result = setPrimaryMediaHandler(upFiles, fileId)
    groupForm.setFieldsValue({ media: result })
  }

  // media menu dropdown
  const menuItems = (record: VariantMedia): MenuProps['items'] => {
    return [
      mediaArr?.some((item: VariantMedia) => item.fileId === record.fileId)
        ? {
            key: '1',
            label: 'Set as Primary',
            onClick: () => fileActiveHandler(mediaArr, record?.fileId),
          }
        : null,
      {
        key: '2',
        label: 'Preview',
      },
    ]
  }

  // form submit handler
  const onFinish = (values: any): void => {
    // update variant recursively by key
    const updatedData = updateVariantRecursively(variantsTableState, selectedList?.key as string, values)
    dispatch(setVariantsTable(updatedData))
    closeModal()
  }

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
                name="media"
                label={
                  <InfoTooltip title="Select media by checking on the checkbox or media preview">
                    Variant Images
                  </InfoTooltip>
                }
                valuePropName="checked"
                // Transform IDs → media objects before storing in form state
                getValueFromEvent={(checkedIds: string[]) =>
                  uploadedMediaArr.filter((media: VariantMedia) => checkedIds.includes(media.fileId))
                }
                // Convert objects → IDs when populating the field (for edit mode)
                getValueProps={(mediaObjects: VariantMedia[] = []) => ({
                  value: mediaObjects.map(obj => obj.fileId)
                })}
              >
                {uploadedMediaArr?.length ? (
                  <Checkbox.Group className="d-flex">
                    <div className="media-list-container w-100">
                      {uploadedMediaArr.map((media: VariantMedia) => (
                        <CheckBoxWrapper
                          value={media.fileId} // still using fileId for the checkbox control
                          key={media.fileId}
                          className="checkbox-button media-list-wrapper"
                        >
                          <div
                            className={`media-list w-100 ${
                              mediaArr?.some((item: VariantMedia) => item.fileId === media.fileId) ? 'active-border' : ''
                            }`}
                          >
                            <div className="upload-action">
                              {mediaArr?.some((item: VariantMedia) => item.fileId === media.fileId && item.isPrimary) ? (
                                <StarFilled className="primary-color p-1" />
                              ) : (
                                <span />
                              )}
                              <DropdownWrapper
                                menu={{ items: menuItems(media) }}
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
                name="showOnlySelected"
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
