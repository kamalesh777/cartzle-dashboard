/* eslint-disable no-duplicate-imports */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'

import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Form } from 'antd'

import type { FormInstance, UploadFile } from 'antd'

import { getRequest, postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { FormItemWrapper, ButtonWrapper, EmptyWrapper, SpaceWrapper } from '@/components/Wrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

import { imageToBase64 } from '@/utils/commonFunctions'

interface PropTypes {
  form: FormInstance
}

const ProductMediaCard = ({ form }: PropTypes): JSX.Element => {
  const productId = Form.useWatch('id', form) || 'temp'
  const uploadedMedia = Form.useWatch('uploadedMedia', form)
  const mediaImages = Form.useWatch('media', form)

  // fetch the uploaded media list
  useEffect(() => {
    getMediaList()
  }, [productId])

  useEffect(() => {
    if (mediaImages?.length > 0) {
      fileUploadHandler(mediaImages)
    }
  }, [mediaImages])

  // get media list
  const getMediaList = async (): Promise<void> => {
    try {
      const res = await getRequest(`/api/get-media-list/${productId}`)
      if (res.data.success) {
        form.setFieldValue('uploadedMedia', res.data.result)
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    }
  }

  const fileUploadHandler = async (fileList: UploadFile[]): Promise<void> => {
    try {
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
        form.setFieldsValue({ media: [] })
      }
    } catch (error) {
      Toast('error', (error as Error).message)
    }
  }

  return (
    <>
      <FormItemWrapper name="media" label="Media" getValueFromEvent={obj => obj.fileList}>
        <UploadWrapper multiple listType="text" showUploadList={false} />
      </FormItemWrapper>
      <FormItemWrapper name="uploadedMedia" label="Uploaded Media" className="mb-0">
        {uploadedMedia?.length ? (
          <div className="media-list-container">
            {uploadedMedia?.map((media: any) => (
              <div key={media?.name} className="media-list">
                <img
                  src={`${MEDIA_BASE_URL}/${media.fileId}?preview=true`}
                  alt={media.name}
                  className="w-20 h-20"
                />
                <SpaceWrapper className="upload-action" size={0}>
                  <ButtonWrapper type="text" icon={<EyeOutlined className="text-white" />} tooltip="View" />
                  <ButtonWrapper
                    type="text"
                    icon={<DeleteOutlined className="text-white" />}
                    tooltip="Delete"
                  />
                </SpaceWrapper>
              </div>
            ))}
          </div>
        ) : (
          <EmptyWrapper entity="Media" className="ant-card-bordered p-4" style={{ borderRadius: '8px' }} />
        )}
      </FormItemWrapper>
    </>
  )
}

export default ProductMediaCard
