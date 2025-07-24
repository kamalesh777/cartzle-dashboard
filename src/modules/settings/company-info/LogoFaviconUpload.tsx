import React, { useLayoutEffect, useState } from 'react'

import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

import { Form, Image, Upload, type UploadFile } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import type { UploadChangeParam } from 'antd/es/upload'

import { postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { FormItemWrapper, SpaceWrapper, TooltipWrapper } from '@/components/Wrapper'
import BrowseFile from '@/components/Wrapper/BrowseFile'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { imageToBase64 } from '@/utils/commonFunctions'
import { IMAGE_PLACEHOLDER } from '@/constants/AppConstant'
import NextImage from '@/components/NextImage'

interface PropTypes {
  name: string
  label: string
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  type: string
  form: FormInstance
}

const LogoFaviconUpload = ({ name, label, type, form }: PropTypes): JSX.Element => {
  const mediUrl = Form.useWatch(name, form) || ''

  const [imgLoading, setImgLoading] = useState<boolean>(false)
  const [imgId, setImgId] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  // Sync form value with local state
  useLayoutEffect(() => {
    setImgId(mediUrl)
  }, [mediUrl])

  // Upload handler
  const uploadHandler = async ({ file }: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    setImgLoading(true)
    try {
      if (file.status === 'done') {
        const base64 = await imageToBase64(file.originFileObj as unknown as File)
        const payload = {
          base64,
          name: `${type}.webp`,
          type,
        }
        const resp = await postRequest('/api/brand-media-upload', payload)
        const data = resp.data
        if (data.success) {
          Toast('success', data.message)
          setImgId(data.result.fileId)
          form.setFieldValue(name, data.result.fileId)
        } else {
          Toast('error', resp.data.message)
        }
      }
    } catch (err) {
      Toast('error', (err as Error).message)
    } finally {
      setImgLoading(false)
    }
  }

  // File change handler
  const changeHandler = (info: UploadChangeParam<UploadFile<any>>): void => {
    setPreviewVisible(false)
    uploadHandler(info)
  }

  return (
    <FormItemWrapper name={name} label={label}>
      {/* If uploading or no image yet, show BrowseFile */}
      {imgLoading || !imgId ? (
        <BrowseFile loading={imgLoading} onChange={uploadHandler} />
      ) : (
        <Image
          src={`${MEDIA_BASE_URL}/${imgId}?${Date.now()}&preview=true&type=thumbnail`}
          width={170}
          height={100}
          alt={label}
          className="logo-favicon-preview"
          fallback={IMAGE_PLACEHOLDER}
          preview={{
            visible: previewVisible,
            src: `${MEDIA_BASE_URL}/${imgId}?${Date.now()}&preview=true&type=url`,
            closeIcon: <CloseOutlined onClick={() => setPreviewVisible(false)} />,
            mask: (
              <SpaceWrapper size={12}>
                <TooltipWrapper title="Preview">
                  <EyeOutlined onClick={() => setPreviewVisible(true)} />
                </TooltipWrapper>
                <TooltipWrapper title="Change">
                  <Upload onChange={changeHandler} showUploadList={false}>
                    <EditOutlined className="text-white" />
                  </Upload>
                </TooltipWrapper>
              </SpaceWrapper>
            ),
          }}
        />
      )}
    </FormItemWrapper>
  )
}

export default LogoFaviconUpload
