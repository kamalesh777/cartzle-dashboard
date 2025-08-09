import React from 'react'

import { FileImageOutlined } from '@ant-design/icons'
import { Skeleton, Upload, type UploadProps } from 'antd'

interface UploadWrapperProps extends UploadProps {
  icons?: React.ReactNode
  text?: string
  helperText?: string
  loading?: boolean
}

const UploadWrapper = ({ icons, text, helperText, loading, ...props }: UploadWrapperProps): JSX.Element => {
  // loading content when loading
  const loadingContent = (
    <div>
      <p className="fs-1">
        <Skeleton.Image active style={{ width: 80, height: 80 }} />
      </p>
      <p className="ant-upload-hint mt-2 mb-0">Uploading...</p>
    </div>
  )
  // default content when not loading
  const defaultContent = (
    <>
      {icons ? (
        icons
      ) : (
        <p className="fs-1">
          <FileImageOutlined className="text-secondary" />
        </p>
      )}

      <p>{text || 'Click or drag file to this area to upload'}</p>
      <p className="ant-upload-hint mb-3 fs-7">
        {helperText || 'Only Accept images are .jpeg, .jpg, .png, .webp, .svg'}
      </p>
    </>
  )
  return (
    <Upload.Dragger {...props} className="common-uploader">
      {loading ? loadingContent : defaultContent}
    </Upload.Dragger>
  )
}

export default UploadWrapper
