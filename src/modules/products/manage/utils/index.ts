import type { VariantCombination, VariantMedia } from '../types'

// ✅ Immutable helper to force rerender and ensure star updates
export const setPrimaryMediaHandler = (mediaFiles: VariantMedia[], fileId: string): VariantMedia[] => {
  return (mediaFiles || []).map((item: VariantMedia) =>
    item.fileId === fileId ? { ...item, isPrimary: true } : { ...item, isPrimary: false }
  )
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
