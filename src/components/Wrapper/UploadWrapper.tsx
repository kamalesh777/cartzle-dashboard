'use client'
/* eslint-disable no-inline-comments */
import { PaperClipOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'
import React, { useMemo, useState } from 'react'

import Toast from '@components/Common/Toast'
import { MAX_FILE_UPLOAD_COUNT, MAX_FILE_UPLOAD_SIZE } from '@constants/AppConstant'
import { type fileType } from '@utils/allTypes'
import { getBase64 } from '@utils/commonFunctions'

import type { RcFile } from 'antd/es/upload'
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface'
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface uploadPropsType extends UploadProps {
  getFiles?: (files: fileType[]) => void
  maximumSize?: number
  uploadClass?: string
  crop?: boolean
}

const UploadWrapper = (props: uploadPropsType): JSX.Element => {
  const { getFiles, maximumSize, maxCount, accept, uploadClass, children, multiple = true, crop = false } = props

  // main code start
  const [fileList, setFileList] = useState<fileType[]>([])

  // upload props for upload component
  const uploadProps: UploadProps = useMemo(
    () => ({
      beforeUpload: newFile => {
        const isLt2M = newFile.size / 1024 / 1024 < (maximumSize ?? MAX_FILE_UPLOAD_SIZE)
        if (!isLt2M) {
          Toast('error', '', 'File must smaller than 2MB!')
        }

        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        const duplicateFile = !!fileList.find(file => file.name === newFile.name)
        // check file alraedy exist or not if true then show a message otherwise return
        if (duplicateFile) {
          Toast('error', '', 'Duplicate file is not allowed')
        }

        const isMaxFileExceed = fileList.length === (maxCount ?? MAX_FILE_UPLOAD_COUNT)

        if (isMaxFileExceed) {
          Toast('error', '', `You can only upload maximum of ${maxCount ?? MAX_FILE_UPLOAD_COUNT} files`)
        }

        return (isLt2M && !duplicateFile && !isMaxFileExceed) || Upload.LIST_IGNORE
      },
      onChange: async ({ fileList }): Promise<void> => {
        const filesArr = await Promise.all(
          fileList.map(async file =>
            // eslint-disable-next-line no-prototype-builtins
            file.hasOwnProperty('fileId')
              ? file
              : await new Promise(resolve => {
                  getBase64(file.originFileObj as RcFile, base64 => {
                    const result = {
                      name: file.name,
                      size: file.size,
                      type: file.type,
                      originalImg: base64,
                      originFileObj: file.originFileObj,
                    }
                    resolve(result)
                  })
                }),
          ),
        )
        setFileList(filesArr as fileType[])
        getFiles != null && getFiles(filesArr as fileType[])
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileList, maxCount, maximumSize],
  )

  const allProps = {
    ...props,
    ...uploadProps,
  }
  return (
    <>
      <div className="file-uploader">
        {crop ? (
          <ImgCrop rotationSlider>
            <Upload
              {...allProps}
              // fileList={fileList as UploadFile[]}
              accept={accept ?? 'video/*, image/*'}
              className={`d-block ${uploadClass ?? ''}`}
              maxCount={maxCount ?? MAX_FILE_UPLOAD_COUNT}
              multiple={multiple}
            >
              {children ?? (
                <p>
                  <PaperClipOutlined className="mr-1" />
                  Browse or drop files here
                </p>
              )}
            </Upload>
          </ImgCrop>
        ) : (
          <Upload
            {...allProps}
            fileList={fileList as UploadFile[]}
            accept={accept ?? 'video/*, image/*'}
            className={`d-block ${uploadClass ?? ''}`}
            maxCount={maxCount ?? MAX_FILE_UPLOAD_COUNT}
            multiple={multiple}
          >
            {children ?? (
              <p>
                <PaperClipOutlined className="mr-1" />
                Browse or drop files here
              </p>
            )}
          </Upload>
          // eslint-disable-next-line indent
        )}
        {/* {percent !== 0 && <Progress percent={percent} format={() => null} size="small" className="upload-percent" />} */}
      </div>
    </>
  )
}

export default UploadWrapper
