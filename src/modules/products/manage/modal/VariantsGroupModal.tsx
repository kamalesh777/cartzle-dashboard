/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'

import { UploadOutlined } from '@ant-design/icons'
import { Form, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import type { VariantCombination, VariantMedia } from '../types'
import type { MediaObject } from '@/components/Gallery/types'
import type { RootState } from '@/store/index'
// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'
import type { FormInstance, Rule } from 'antd/es/form'

import type { ModalPropTypes } from 'src/types/common'

import { InfoTooltip } from '@/components/Common'

import GalleryModal from '@/components/Gallery'
import {
  ButtonWrapper,
  CardWrapper,
  CheckBoxWrapper,
  ColWrapper,
  EmptyWrapper,
  FormItemWrapper,
  InputNumberWrapper,
  ModalWrapper,
  SelectWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'

import FormWrapper from '@/components/Wrapper/FormWrapper'
import ImagePreview from '@/components/Wrapper/ImagePreviewWrapper'
import VerticalScrollWrapper from '@/components/Wrapper/VerticalScrollWrapper'
import { COMMON_ROW_GUTTER, requiredFieldRules } from '@/constants/AppConstant'
import useDevice from '@/hook/useDevice'
import { setVariantsTable } from '@/store/slices/variantsSlice'
import { modalCloseHandler } from '@/utils/commonFunctions'

import { previewMediaUrl } from '@/utils/mediaUtils'

import PriceCard from '../Components/PriceCard'
import { setPrimaryMediaHandler, updateVariantRecursively } from '../utils' // keep only updateVariantRecursively

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

  const {} = useDevice()

  // find selected variant by key
  const selectedVariant = variantsTableState?.find(item => item.key === selectedList?.key)
  const mediaState = selectedVariant?.media

  // main product form watchers
  const mediaFilesArr = Form.useWatch('mediaFiles', form)
  const variantsArr = Form.useWatch('variantOptions', form)

  // modal group form
  const [groupForm] = Form.useForm()
  const showOnlySelected = Form.useWatch(['showOnlySelected'], groupForm)
  const mediaArr = Form.useWatch('media', groupForm) || ([] as MediaObject[])

  const [openPreviewModal, setOpenPreviewModal] = useState(false)
  const [selectedFileId] = useState('')
  const [openGalleryModal, setOpenGalleryModal] = useState(false)

  useEffect(() => {
    groupForm.setFieldsValue({ ...selectedList, media: mediaState })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList, mediaState])

  // lookup helpers (fast + stable)
  const selectedIds = useMemo(() => new Set(mediaArr?.map((m: MediaObject) => m.fileId)), [mediaArr])
  const primaryId = useMemo(() => mediaArr?.find((m: MediaObject) => m.isPrimary)?.fileId, [mediaArr])

  // filter media files based on "show only selected"
  const uploadedMediaArr = useMemo(
    () =>
      showOnlySelected
        ? mediaFilesArr?.filter((media: VariantMedia) => selectedIds.has(media.fileId))
        : mediaFilesArr,
    [showOnlySelected, mediaFilesArr, selectedIds],
  )

  const closeModal = (): void => modalCloseHandler(setOpenModal)

  // set primary media handler — update groupForm (and keep product form in sync)
  const fileActiveHandler = (upFiles: VariantMedia[], fileId: string): void => {
    const result = setPrimaryMediaHandler(upFiles, fileId) // immutable
    groupForm.setFieldsValue({ media: result })
  }

  // media menu dropdown
  const menuItems = (record: VariantMedia): MenuProps['items'] => {
    const isSelected = selectedIds.has(record.fileId)
    const isAlreadyPrimary = primaryId === record.fileId

    return [
      isSelected
        ? {
            key: '1',
            label: 'Set as Primary',
            disabled: isAlreadyPrimary,
            onClick: () => fileActiveHandler(mediaArr || [], record.fileId),
          }
        : null,
      {
        key: '2',
        label: 'Preview',
        onClick: () => setOpenPreviewModal(true),
      },
    ].filter(Boolean) as MenuProps['items']
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
    <>
      <ModalWrapper
        open={openModal}
        onCancel={closeModal}
        bodyScroll={selectedList?.parent ? false : '500px'}
        title={`Variants: ${selectedList?.label}`}
        width={600}
        footer={
          <SubmitButtonWrapper
            okButtonProps={{ loading: false, onClick: () => groupForm.submit() }}
            cancelButtonProps={{ onClick: () => closeModal() }}
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
                <CardWrapper
                  className="mb-2"
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
                      <UploadOutlined /> Browse Media
                    </ButtonWrapper>,
                  ]}
                >
                  <FormItemWrapper
                    name="media"
                    label={
                      <InfoTooltip title="Select / Deselect media based on the variant">Media</InfoTooltip>
                    }
                    className="mb-1"
                  >
                    {mediaArr?.length > 0 ? (
                      <VerticalScrollWrapper maxHeight={80} className="flex-row">
                        {mediaArr?.map((media: MediaObject) => (
                          <div className="media-item" key={media.fileId}>
                            <img
                              src={previewMediaUrl(`${media.filePath}?tr=w-80,h-60`)}
                              title={media.name}
                              alt={media.name}
                            />
                          </div>
                        ))}
                      </VerticalScrollWrapper>
                    ) : (
                      <EmptyWrapper
                        imageStyle={{ width: 100, height: 100, margin: 'auto' }}
                        entity="Media"
                        bordered={false}
                        style={{ borderRadius: '8px', marginInline: 0 }}
                        // onClick={() => setOpenGalleryModal(true)}
                      />
                    )}
                  </FormItemWrapper>
                </CardWrapper>
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
      {/* preview modal */}
      {openPreviewModal && (
        <ImagePreview
          multiple
          items={uploadedMediaArr}
          visible={openPreviewModal}
          setVisible={setOpenPreviewModal}
          src={selectedFileId}
        />
      )}
      {openGalleryModal && (
        <GalleryModal
          openModal={openGalleryModal}
          setOpenModal={setOpenGalleryModal}
          name="media"
          form={groupForm}
        />
      )}
    </>
  )
}

export default VariantsGroupModal
