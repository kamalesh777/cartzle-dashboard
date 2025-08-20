import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

export const previewMediaUrl = (filePath: string): string => {
  return `${MEDIA_BASE_URL}/preview/${encodeURIComponent(filePath)}`
}
