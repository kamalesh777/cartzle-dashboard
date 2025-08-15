import type { VariantCombination, VariantMedia } from '../types'

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

export const updateVariantRecursively = (
  items: VariantCombination[],
  targetKey: string,
  values: any,
): VariantCombination[] => {
  return items.map(item => {
    if (item.key === targetKey) {
      return { ...item, ...values }
    }

    // If there are children, recurse into them
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: updateVariantRecursively(item.children, targetKey, values),
      }
    }

    return item
  })
}
