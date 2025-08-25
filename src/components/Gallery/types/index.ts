import type { UploadFile } from 'antd'

export interface MediaObject {
  fileId: string
  name: string
  isPrimary: boolean
  filePath: string
}
export interface GalleryFormValues {
  uploadMedia: UploadFile[]
  selectedMedia: MediaObject[]
}
