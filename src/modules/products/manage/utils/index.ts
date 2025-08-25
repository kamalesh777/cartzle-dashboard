import type { VariantCombination } from '../types'

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
