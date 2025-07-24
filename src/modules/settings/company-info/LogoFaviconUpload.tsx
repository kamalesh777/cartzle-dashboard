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
import { imageToBase64 } from '@/utils/commonFunctions'

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
  const [imgUrl, setImgUrl] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  // set image url based on form value
  useLayoutEffect(() => {
    setImgUrl(mediUrl)
  }, [mediUrl])

  // file upload handler
  const uploadHandler = async ({ file }: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    setImgLoading(true)
    // setImgUrl('')
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
          // after upload set that value inside of logo input
          setImgUrl(data.result.url)
          form.setFieldValue(name, data.result.url)
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

  // file change handler
  const changeHandler = (info: UploadChangeParam<UploadFile<any>>): void => {
    setPreviewVisible(false)
    uploadHandler(info)
  }

  return (
    <FormItemWrapper name={name} label={label}>
      {imgUrl ? (
        <Image
          src={`${imgUrl}?${Date.now()}`}
          alt={label}
          className="logo-favicon-preview"
          preview={{
            visible: previewVisible,
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
      ) : (
        <BrowseFile loading={imgLoading} onChange={uploadHandler} />
      )}
    </FormItemWrapper>
  )
}

export default LogoFaviconUpload
