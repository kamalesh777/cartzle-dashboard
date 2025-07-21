import React, { useState } from 'react'

import type { UploadFile } from 'antd'

import type { UploadChangeParam } from 'antd/es/upload'

import { postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'
import { FormItemWrapper } from '@/components/Wrapper'
import BrowseFile from '@/components/Wrapper/BrowseFile'
import { imageToBase64 } from '@/utils/commonFunctions'

interface PropTypes {
  name: string
  label: string
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  type: string
}

const LogoFaviconUpload = ({ name, label, type }: PropTypes): JSX.Element => {
  const [imgLoading, setImgLoading] = useState<boolean>(false)

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
        if (resp.data.success) {
          Toast('success', resp.data.message)
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

  return (
    <FormItemWrapper name={name} label={label}>
      <BrowseFile loading={imgLoading} onChange={uploadHandler} />
    </FormItemWrapper>
  )
}

export default LogoFaviconUpload
