import React from 'react'

import { FileImageOutlined } from '@ant-design/icons'
import { Upload, type UploadProps } from 'antd'

interface UploadWrapperProps extends UploadProps {
  icons?: React.ReactNode
  text?: string
  helperText?: string
}

const UploadWrapper = ({ icons, text, helperText, ...props }: UploadWrapperProps): JSX.Element => {
  return (
    <Upload.Dragger {...props} className="common-uploader">
      {icons ? (
        icons
      ) : (
        <>
          <p className="fs-1">
            <FileImageOutlined className="text-secondary" />
          </p>
          <p>{text || 'Click or drag file to this area to upload'}</p>
          <p className="ant-upload-hint mb-3 fs-7">
            {helperText || 'Only Accept images are .jpeg, .jpg, .png, .webp, .svg'}
          </p>
        </>
      )}
    </Upload.Dragger>
  )
}

export default UploadWrapper
