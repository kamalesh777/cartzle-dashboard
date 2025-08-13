/* eslint-disable no-duplicate-imports */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from 'react'

import { MoreOutlined, StarFilled } from '@ant-design/icons'
import { Form } from 'antd'

import type { VariantMedia } from '../types'
import type { FormInstance, MenuProps, UploadFile } from 'antd'

import { getRequest, postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { FormItemWrapper, EmptyWrapper, DropdownWrapper } from '@/components/Wrapper'
import DeleteModalWrapper from '@/components/Wrapper/DeleteModalWrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

import { PRIMARY_IMAGE_ID } from '@/constants/AppConstant'
import { imageToBase64 } from '@/utils/commonFunctions'

import { setPrimaryMediaHandler } from '../utils/setPrimaryHandler'

interface PropTypes {
  form: FormInstance
}

const ProductMediaCard = ({ form }: PropTypes): JSX.Element => {
  const productId = Form.useWatch('id', form) || 'temp'
  const mediaFiles = Form.useWatch('mediaFiles', form)
  const uploadMedia = Form.useWatch('uploadMedia', form)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedFileId, setSelectedFileId] = useState('')
  const [fileUploadLoading, setFileUploadLoading] = useState(false)

  // useMemo for uploaded files
  const uploadedMediaArr = useMemo(() => mediaFiles, [mediaFiles])

  // fetch the uploaded media list
  useEffect(() => {
    getMediaList()
  }, [productId])

  useEffect(() => {
    if (uploadMedia?.length > 0) {
      fileUploadHandler(uploadMedia)
    }
  }, [uploadMedia])

  // get media list
  const getMediaList = async (): Promise<void> => {
    try {
      const res = await getRequest(`/api/get-media-list/${productId}`)
      if (res.data.success) {
        const result = res.data.result
        form.setFieldsValue({ mediaFiles: result, [PRIMARY_IMAGE_ID]: result[0]?.fileId })
      }
    } catch (error) {
      Toast('error', (error as Error).message)
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
        getMediaList() // fetch media list after upload
        form.setFieldValue('uploadMedia', null)
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    } finally {
      setFileUploadLoading(false)
    }
  }

  // delete media handler
  const deleteMediaHandler = async (fileId: string): Promise<void> => {
    setSelectedFileId(fileId)
    setOpenDeleteModal(true)
  }

  // file active handler
  const fileActiveHandler = (uploadedFiles: VariantMedia[], index: number): void => {
    const result = setPrimaryMediaHandler(uploadedFiles, index)
    form.setFieldsValue({ mediaFiles: result })
  }

  const menuItems = (record: VariantMedia, index: number): MenuProps['items'] => {
    return [
      {
        key: '1',
        label: 'Set as Primary',
        onClick: () => fileActiveHandler(uploadedMediaArr, index),
      },
      {
        key: '2',
        label: 'View',
        onClick: () => deleteMediaHandler(record?.fileId),
      },
      {
        type: 'divider',
      },
      {
        key: '3',
        label: 'Delete',
        onClick: () => deleteMediaHandler(record?.fileId),
        className: 'error-color',
      },
    ]
  }

  return (
    <>
      <FormItemWrapper name="uploadMedia" label="Upload Media" getValueFromEvent={obj => obj.fileList}>
        <UploadWrapper
          multiple
          listType="text"
          fileList={uploadMedia}
          showUploadList={false}
          loading={fileUploadLoading}
        />
      </FormItemWrapper>
      <FormItemWrapper
        name="mediaFiles"
        label="Media Files"
        className="mb-0"
        tooltip="All uploaded media list"
      >
        {uploadedMediaArr?.length ? (
          <div className="media-list-container" style={{ gap: '0px' }}>
            {uploadedMediaArr?.map((media: VariantMedia, index: number) => (
              <div key={media?.name} className={`media-list mb-2 ${media?.isPrimary ? 'active-border' : ''}`}>
                <div className="upload-action">
                  {media?.isPrimary ? <StarFilled className="primary-color" /> : <span />}
                  <DropdownWrapper menu={{ items: menuItems(media, index) }}>
                    <MoreOutlined className="bg-white p-1" />
                  </DropdownWrapper>
                </div>
                <img src={`${MEDIA_BASE_URL}/${media.fileId}?preview=true&tr=w-100,h-100`} alt={media.name} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyWrapper
            imageStyle={{ width: 100, height: 100, margin: 'auto' }}
            entity="Media"
            className="ant-card-bordered p-4 text-center"
            style={{ borderRadius: '8px' }}
          />
        )}
      </FormItemWrapper>
      <DeleteModalWrapper
        apiEndpoint={`/api/media-service/${selectedFileId}`}
        openModal={openDeleteModal}
        closeModal={setOpenDeleteModal}
        description="Are you sure you want to delete this media?"
        afterDelete={() => {
          getMediaList()
          setSelectedFileId('')
        }}
      />
    </>
  )
}

export default ProductMediaCard
