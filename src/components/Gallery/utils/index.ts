import type { MediaObject } from '../types'

export const setPrimaryMediaHandler = (mediaFiles: MediaObject[], fileId: string): MediaObject[] => {
  return (mediaFiles || []).map((item: MediaObject) =>
    item.fileId === fileId ? { ...item, isPrimary: true } : { ...item, isPrimary: false },
  )
}
