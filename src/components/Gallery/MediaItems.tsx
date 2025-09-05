/* eslint-disable @next/next/no-img-element */
import React from 'react'

import { CircleX, Star } from 'lucide-react'

import type { MediaObject } from '@/components/Gallery/types'

import type { FormInstance } from 'antd'

import { previewMediaUrl } from '@/utils/mediaUtils'

import { setPrimaryMediaHandler } from './utils'
import { ButtonWrapper, TooltipWrapper } from '../Wrapper'

interface MediaItemsProps {
  mediaArr: MediaObject[]
  entity?: string
  form?: FormInstance
  className?: string
}

const MediaItems = ({ mediaArr, form, className }: MediaItemsProps): JSX.Element => {
  // handle primary media
  const fileActiveHandler = (upFiles: MediaObject[], fileId: string): void => {
    const result = setPrimaryMediaHandler(upFiles, fileId) // immutable
    form?.setFieldsValue({ media: result })
  }
  // handle delete media
  const deleteFileHandler = (upFiles: MediaObject[], fileId: string): void => {
    const result = upFiles.filter((file: MediaObject) => file.fileId !== fileId) // immutable
    form?.setFieldsValue({ media: result })
  }
  return (
    <>
      {mediaArr?.map((media: MediaObject) => (
        <div className={`media-item ${className ?? ''}`} key={media.fileId}>
          {media.isPrimary ? (
            <div className="active">
              <Star />
            </div>
          ) : null}
          <img src={previewMediaUrl(`${media.filePath}?tr=w-103,h-70`)} title={media.name} alt={media.name} />
          <div className="media-action">
            <TooltipWrapper title="Make Primary">
              <ButtonWrapper
                type="link"
                className="text-white"
                icon={media.isPrimary ? <Star /> : <Star />}
                onClick={() => fileActiveHandler(mediaArr, media.fileId)}
              />
            </TooltipWrapper>
            <TooltipWrapper title="Remove">
              <CircleX
                onClick={() => deleteFileHandler(mediaArr, media.fileId)}
                className="text-white cursor-pointer"
              />
            </TooltipWrapper>
          </div>
          <div className="media-action-overlay" />
        </div>
      ))}
    </>
  )
}

export default MediaItems
