import React from 'react'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

import type { UploadChangeParam, UploadFile } from 'antd/es/upload'

import ButtonWrapper from './ButtonWrapper'

import SpaceWrapper from './SpaceWrapper'

interface Props {
  name: string
  loading: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
  children?: React.ReactNode
  className?: string
}

const BrowseFile = ({ name, loading, onChange, children, className }: Props): JSX.Element => {
  const uploadButton = (
    <ButtonWrapper style={{ border: 0, background: 'none' }}>
      <SpaceWrapper align="center" direction="vertical" size={0}>
        {loading ? <LoadingOutlined /> : <UploadOutlined />}
        Upload
      </SpaceWrapper>
    </ButtonWrapper>
  )

  return (
    <ImgCrop
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onModalOk={file => onChange?.(file as unknown as UploadChangeParam<UploadFile<any>>)}
      modalOk="Crop"
      rotationSlider
      aspectSlider
      showGrid={true}
      showReset
      zoomSlider
      maxAspect={name.startsWith('logo') ? 8 : 2}
    >
      <Upload
        maxCount={1}
        className={className || 'logo-favicon-preview'}
        listType="picture-card"
        showUploadList={false}
      >
        {children || uploadButton}
      </Upload>
    </ImgCrop>
  )
}

export default BrowseFile
