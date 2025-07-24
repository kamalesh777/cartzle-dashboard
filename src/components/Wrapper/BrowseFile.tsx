import React from 'react'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

import { Upload } from 'antd'

import type { UploadChangeParam, UploadFile } from 'antd/es/upload'

import ButtonWrapper from './ButtonWrapper'

import SpaceWrapper from './SpaceWrapper'

interface Props {
  loading: boolean
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
}

const BrowseFile = ({ loading, onChange }: Props): JSX.Element => {
  const uploadButton = (
    <ButtonWrapper style={{ border: 0, background: 'none' }}>
      <SpaceWrapper align="center" direction="vertical" size={0}>
        {loading ? <LoadingOutlined /> : <UploadOutlined />}
        Upload
      </SpaceWrapper>
    </ButtonWrapper>
  )

  return (
    <Upload maxCount={1} className="logo-favicon-preview " listType="picture-card" showUploadList={false} onChange={onChange}>
      {uploadButton}
    </Upload>
  )
}

export default BrowseFile
