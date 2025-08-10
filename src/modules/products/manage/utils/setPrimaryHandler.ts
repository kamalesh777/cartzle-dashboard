import type { VariantMedia } from '../types'

// make isPrimary true for current index and make false for other indexes
export const setPrimaryMediaHandler = (mediaFiles: VariantMedia[], index: number): VariantMedia[] => {
  const result = mediaFiles?.map((item: VariantMedia, i: number) => {
    if (i === index) {
      item.isPrimary = true
    } else {
      item.isPrimary = false
    }
    return item
  })
  return result
}
