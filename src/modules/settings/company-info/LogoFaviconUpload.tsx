import React, { useLayoutEffect, useState } from 'react'

import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

import { Form, Image, type UploadFile } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store/index'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import type { UploadChangeParam } from 'antd/es/upload'

import { postRequest } from '@/api/preference/RequestService'
import { Toast } from '@/components/Common'

import { FormItemWrapper, SpaceWrapper } from '@/components/Wrapper'
import BrowseFile from '@/components/Wrapper/BrowseFile'
import { IMAGE_PLACEHOLDER } from '@/constants/AppConstant'
import { applyCompanyData } from '@/store/slices/companySlice'
import { imageToBase64 } from '@/utils/commonFunctions'

interface PropTypes {
  name: string
  label: string
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  type: string
  form: FormInstance
}

const LogoFaviconUpload = ({ name, label, type, form }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()
  const { details: companyData } = useSelector((state: RootState) => state.company)
  const mediUrl = Form.useWatch(name, form) || ''

  const [imgLoading, setImgLoading] = useState<boolean>(false)
  const [imgId, setImgId] = useState<string>('')
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  // Sync form value with local state
  useLayoutEffect(() => {
    setImgId(mediUrl)
  }, [mediUrl])

  // Upload handler
  const uploadHandler = async (file: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    setImgLoading(true)
    try {
      const base64 = await imageToBase64(file as unknown as File)
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

        const versionName = data.result.versionInfo.name
        dispatch(applyCompanyData({ ...companyData, [name]: `${data.result.fileId}?v=${versionName}` }))
      } else {
        Toast('error', resp.data.message || 'Something went wrong')
      }
    } catch (err) {
      Toast('error', (err as Error)?.message || 'Something went wrong')
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
    <FormItemWrapper name={name} label={label} tooltip={`Hover on image to view or upload brand ${type}`}>
      {/* If uploading or no image yet, show BrowseFile */}
      {imgLoading || !imgId ? (
        <BrowseFile name={name} loading={imgLoading} onChange={changeHandler} />
      ) : (
        <Image
          src={`/api/public-media/${imgId}`}
          width={'100%'}
          height={100}
          alt={label}
          className={`logo-favicon-preview ${name}`}
          fallback={IMAGE_PLACEHOLDER}
          preview={{
            visible: previewVisible,
            src: `/api/public-media/${imgId}?${Date.now()}`,
            closeIcon: <CloseOutlined onClick={() => setPreviewVisible(false)} />,
            mask: (
              <SpaceWrapper size={16}>
                <span onClick={() => setPreviewVisible(true)}>
                  <EyeOutlined /> View
                </span>
                <BrowseFile name={name} loading={imgLoading} onChange={changeHandler} className="hide-upload-border text-white">
                  <EditOutlined /> Edit
                </BrowseFile>
              </SpaceWrapper>
            ),
          }}
        />
      )}
    </FormItemWrapper>
  )
}

export default LogoFaviconUpload
