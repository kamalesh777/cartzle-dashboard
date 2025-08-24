/* eslint-disable no-duplicate-imports */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'

import { Checkbox, Form, Row } from 'antd'

import type { MediaObject } from './types'
import type { FormInstance, MenuProps, UploadFile } from 'antd'

import type { ModalPropTypes } from 'src/types/common'

import { getRequest, postRequest } from '@/api/preference/RequestService'
import { InfoTooltip, TableContentLoaderWithProps, Toast } from '@/components/Common'

import MoreVertical from '@/components/Common/Icons/MoreVertical'
import {
  FormItemWrapper,
  EmptyWrapper,
  DropdownWrapper,
  CheckBoxWrapper,
  ButtonWrapper,
  SpaceWrapper,
  ModalWrapper,
  InputSearchWrapper,
  ColWrapper,
  CardWrapper,
  SubmitButtonWrapper,
} from '@/components/Wrapper'
import DeleteModalWrapper from '@/components/Wrapper/DeleteModalWrapper'
import ImagePreview from '@/components/Wrapper/ImagePreviewWrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import { distinctByKey, imageToBase64 } from '@/utils/commonFunctions'

import { previewMediaUrl } from '@/utils/mediaUtils'

import FormWrapper from '../Wrapper/FormWrapper'

interface PropTypes extends ModalPropTypes<never> {
  form: FormInstance
  name?: string
}

const GalleryModal = ({ form, openModal, setOpenModal }: PropTypes): JSX.Element => {
  const [galleryForm] = Form.useForm()
  // temp media files for uploading
  const uploadMedia = Form.useWatch('uploadMedia', galleryForm)
  // selected media files will be attached to the product
  const checkedMediaArr = Form.useWatch('selectedMedia', form) as MediaObject[] | undefined

  const [mediaFiles, setMediaFiles] = useState<MediaObject[]>([])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState('')
  const [fileUploadLoading, setFileUploadLoading] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false)
  const [mediaListLoading, setMediaListLoading] = useState(false)

  const closeModal = (): void => {
    setOpenModal(false)
  }

  // useMemo for uploaded files
  const uploadedMediaArr = useMemo(() => mediaFiles, [mediaFiles])

  // fetch the uploaded media list for temp folder
  useEffect(() => {
    getMediaList()
  }, [])

  useEffect(() => {
    if (uploadMedia?.length > 0) {
      fileUploadHandler(uploadMedia)
    }
  }, [uploadMedia])

  // get media list
  const getMediaList = async (): Promise<void> => {
    try {
      setMediaListLoading(true)
      const res = await getRequest(`/api/get-media-list/temp`)
      if (res.data.success) {
        const result = res.data.result

        setMediaFiles(distinctByKey<MediaObject>(result, 'fileId'))
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    } finally {
      setMediaListLoading(false)
    }
  }

  // file upload handler
  const fileUploadHandler = async (fileList: UploadFile[]): Promise<void> => {
    try {
      setFileUploadLoading(true)
      const allDone = fileList.every(file => file?.status === 'done')

      if (!allDone) return

      // Wait for all base64 conversions to finish
      const filesArr = await Promise.all(
        fileList.map(async file => {
          const base64 = await imageToBase64(file.originFileObj as File, 'webp', 0.5)
          return { base64, name: file.name }
        }),
      )

      // Send request only once after processing all files
      const res = await postRequest('/api/product-media-bulk-upload', { images: filesArr })

      if (res.data.success) {
        Toast('success', res.data.message)
        setTimeout(() => getMediaList(), 1500) // fetch media list after upload
        form.setFieldValue('uploadMedia', null)
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    } finally {
      setFileUploadLoading(false)
    }
  }

  // delete media handler
  const deleteMediaHandler = async (): Promise<void> => {
    setOpenDeleteModal(true)
  }

  // lookup helpers (fast + stable)
  const selectedIds = useMemo(() => new Set(checkedMediaArr?.map(m => m.fileId)), [checkedMediaArr])

  // Select all handler
  const selectAllHandler = (): void => {
    const isAllSelected = checkedMediaArr?.length === uploadedMediaArr?.length
    form.setFieldValue('media', isAllSelected ? [] : uploadedMediaArr)
  }

  const menuItems = (): MenuProps['items'] => {
    // const isSelected = selectedIds.has(record.fileId)
    // const isAlreadyPrimary = primaryId === record.fileId
    return [
      // {
      //   key: '1',
      //   label: 'Set as Primary',
      //   disabled: isAlreadyPrimary || !isSelected,
      //   onClick: () => fileActiveHandler(checkedMediaArr || [], record.fileId),
      // },
      {
        key: '2',
        label: 'Preview',
        onClick: () => setOpenPreviewModal(true),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: 'Delete',
        onClick: () => deleteMediaHandler(),
        className: 'error-color',
      },
    ]
  }

  return (
    <ModalWrapper
      open={openModal}
      bodyScroll={'450px'}
      title="Gallery"
      onCancel={() => setOpenModal(false)}
      width={900}
      footer={
        <SubmitButtonWrapper
          okText={'Update Now!'}
          okButtonProps={{ loading: false, onClick: () => galleryForm.submit() }}
          cancelButtonProps={{
            onClick: () => closeModal(),
          }}
        />
      }
    >
      <FormWrapper form={galleryForm}>
        <FormItemWrapper name="uploadMedia" getValueFromEvent={obj => obj.fileList}>
          <UploadWrapper
            multiple
            listType="text"
            fileList={uploadMedia}
            showUploadList={false}
            loading={fileUploadLoading}
            loadingText="Please wait it will take a little time!"
          />
        </FormItemWrapper>

        <CardWrapper
          title={
            <Row gutter={COMMON_ROW_GUTTER} className="w-100">
              <ColWrapper md={10}>
                <InfoTooltip
                  title={'All temporary images are listed here and selected will be added in your product'}
                >
                  Media
                </InfoTooltip>
              </ColWrapper>
              <ColWrapper md={14}>
                <div className="ms-auto d-flex">
                  <InputSearchWrapper className="me-2" />
                  {uploadedMediaArr && uploadedMediaArr?.length > 0 ? (
                    <SpaceWrapper>
                      <ButtonWrapper type="link" onClick={selectAllHandler} className="px-0">
                        {checkedMediaArr?.length === uploadedMediaArr?.length ? 'Unselect All' : 'Select All'}
                      </ButtonWrapper>
                      <ButtonWrapper
                        type="link"
                        onClick={getMediaList}
                        className="p-0 primary-color"
                        tooltip="Refresh"
                      >
                        Reload
                      </ButtonWrapper>
                    </SpaceWrapper>
                  ) : null}
                </div>
              </ColWrapper>
            </Row>
          }
        >
          <FormItemWrapper
            className="mb-2"
            name="selectedMedia"
            // ✅ Store objects in form (IDs → objects)
            getValueFromEvent={(checkedIds: string[]) =>
              (uploadedMediaArr || []).filter((m: MediaObject) => checkedIds?.includes(m.fileId))
            }
            // ✅ Feed IDs to Checkbox.Group when editing (objects → IDs)
            getValueProps={(mediaObjects: MediaObject[] = []) => ({
              value: mediaObjects?.map(obj => obj.fileId),
            })}
            valuePropName="checked"
          >
            {mediaListLoading ? (
              <TableContentLoaderWithProps
                columnWidth={[15, 15, 15, 15, 15, 15]}
                rowCounts={2}
                rowHeight={180}
              />
            ) : uploadedMediaArr?.length ? (
              <Checkbox.Group className="d-flex">
                <div className="gallery-list-container w-100">
                  {uploadedMediaArr.map((media: MediaObject) => (
                    <CheckBoxWrapper
                      value={media.fileId}
                      key={media.fileId}
                      className="checkbox-button gallery-list-wrapper"
                    >
                      <div
                        className={`gallery-list w-100 ${
                          selectedIds.has(media.fileId) ? 'active-border' : ''
                        }`}
                      >
                        <div className="upload-action">
                          <span>{}</span>
                          <DropdownWrapper
                            menu={{
                              items: menuItems(),
                              onClick: () => setSelectedFileId(media.fileId),
                            }}
                            overlayStyle={{ minWidth: '140px' }}
                          >
                            <MoreVertical className="p-1" />
                          </DropdownWrapper>
                        </div>
                        <img
                          src={previewMediaUrl(`${media.filePath}?tr=w-100,h-100`)}
                          title={media.name}
                          alt={media.name}
                        />
                      </div>
                    </CheckBoxWrapper>
                  ))}
                </div>
              </Checkbox.Group>
            ) : uploadedMediaArr ? (
              <EmptyWrapper
                imageStyle={{ width: 100, height: 100, margin: 'auto' }}
                entity="Media"
                className="ant-card-bordered p-4 text-center"
                style={{ borderRadius: '8px', marginInline: 0 }}
              />
            ) : null}
          </FormItemWrapper>
        </CardWrapper>

        {/* delete modal */}
        {openDeleteModal && (
          <DeleteModalWrapper
            apiEndpoint={`/api/media-service/${selectedFileId}`}
            openModal={openDeleteModal}
            closeModal={setOpenDeleteModal}
            description="Are you sure you want to delete this media permanently?"
            afterDelete={() => {
              getMediaList()
              setSelectedFileId('')
            }}
          />
        )}
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
      </FormWrapper>
    </ModalWrapper>
  )
}

export default GalleryModal
