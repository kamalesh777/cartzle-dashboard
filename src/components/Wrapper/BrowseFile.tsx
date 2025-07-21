import React from 'react'

import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'

import { Upload } from 'antd'

import type { UploadChangeParam, UploadFile } from 'antd/es/upload'

import ButtonWrapper from './ButtonWrapper'

import InputWrapper from './InputWrapper'
import SpaceWrapper from './SpaceWrapper'

interface Props {
  loading: boolean
  onChange?: (info: UploadChangeParam<UploadFile<any>>) => void
}

const BrowseFile = ({ loading, onChange }: Props): JSX.Element => {
  const uploadButton = (
    <ButtonWrapper style={{ border: 0, background: 'none' }}>
      <SpaceWrapper align="center">
        {loading ? <LoadingOutlined /> : <UploadOutlined />}
        Browse
      </SpaceWrapper>
    </ButtonWrapper>
  )

  return (
    <InputWrapper
      addonAfter={
        <Upload maxCount={1} className="mx-n3" showUploadList={false} onChange={onChange}>
          {uploadButton}
        </Upload>
      }
    />
  )
}

export default BrowseFile
