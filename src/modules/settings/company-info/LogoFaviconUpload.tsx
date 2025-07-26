import React, { useState } from 'react'

import { CloseOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'

import { Form, Image, type UploadFile } from 'antd'

// eslint-disable-next-line no-duplicate-imports
import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import type { UploadChangeParam } from 'antd/es/upload'

import { FormItemWrapper, SpaceWrapper } from '@/components/Wrapper'
import BrowseFile from '@/components/Wrapper/BrowseFile'
import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { IMAGE_PLACEHOLDER } from '@/constants/AppConstant'

import { imageToBase64 } from '@/utils/commonFunctions'

interface PropTypes {
  name: string
  label: string
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  type: string
  form: FormInstance
}

const LogoFaviconUpload = ({ name, label, type, form }: PropTypes): JSX.Element => {
  const { company } = useSelector((state: RootState) => state.company?.details)
  const mediaData = Form.useWatch(name, form) || ''

  const [imgLoading] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)

  // File change handler
  const changeHandler = async (file: UploadChangeParam<UploadFile<any>>): Promise<void> => {
    setPreviewVisible(false)
    const base64 = await imageToBase64(file as unknown as File)

    form.setFieldsValue({ [name]: base64 })
  }

  // Image data based on base64 or media id
  const imageData =
    typeof mediaData === 'string' && mediaData != null && mediaData?.startsWith('data:image')
      ? mediaData
      : `${MEDIA_BASE_URL}/${mediaData}?preview=true&tr=w-400${company.versionName ? `&v=${company.versionName}` : ''}`

  return (
    <FormItemWrapper name={name} label={label} tooltip={`Hover on image to view or update brand ${type}`}>
      {/* If uploading or no image yet, show BrowseFile */}
      {imgLoading || !mediaData ? (
        <BrowseFile name={name} loading={imgLoading} onChange={changeHandler} />
      ) : (
        <Image
          src={imageData}
          width={'100%'}
          height={100}
          alt={label}
          className={`logo-favicon-preview ${name}`}
          fallback={IMAGE_PLACEHOLDER}
          preview={{
            visible: previewVisible,
            src: `${imageData}?preview=true&tr=700`,
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
