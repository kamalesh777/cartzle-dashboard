import { FormItemWrapper, ButtonWrapper, EmptyWrapper } from '@/components/Wrapper'
import UploadWrapper from '@/components/Wrapper/UploadWrapper'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import React, { useEffect, useState } from 'react'
import { Form, FormInstance, UploadFile } from 'antd'
import { getRequest, postRequest } from '@/api/preference/RequestService'
import { imageToBase64 } from '@/utils/commonFunctions'

interface PropTypes {
  form: FormInstance
}

const ProductMediaCard = ({ form }: PropTypes) => {

  const productId = Form.useWatch('id', form) || 'temp'
  const uploadedMedia = Form.useWatch('uploadedMedia', form)
  const mediaImages = Form.useWatch('media', form)

  const [productImages, setProductImages] = useState<{ base64: string; name: string }[]>([])

  // fetch the uploaded media list
  useEffect(() => {
    getMediaList()
  }, [productId])

  useEffect(() => {
    if (mediaImages?.length > 0) {
      fileUploadHandler(mediaImages)
    }
  }, [mediaImages])

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

  // get media list
  const getMediaList = async () => {
    try {
      const res = await getRequest(`/api/get-media-list/${productId}`)
      if (res.data.success) {
        form.setFieldValue('uploadedMedia', res.data.result)
      }
    } catch (error) {
      console.log('===error', error)
    }
  }

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



  return (
    <>
      <FormItemWrapper name="media" label="Media" getValueFromEvent={obj => obj.fileList}>
        <UploadWrapper multiple listType="text" showUploadList={false} />
      </FormItemWrapper>
      <FormItemWrapper name="uploadedMedia" label="Uploaded Media">
        {uploadedMedia?.length ? (
          <div className='media-list-container'>
            {uploadedMedia?.map((media: any) => (
              <div key={media?.name} className="media-list">
                <img
                  src={`${MEDIA_BASE_URL}/${media.fileId}?preview=true`}
                  alt={media.name}
                  className="w-20 h-20"
                />
                <ButtonWrapper type="text">Remove</ButtonWrapper>
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