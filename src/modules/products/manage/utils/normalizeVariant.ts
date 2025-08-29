import type { VariantCombination } from '../types'

export const filterProducts = (
  arr: VariantCombination[],
  variantsArr: VariantCombination[],
): VariantCombination[] => {
  // Check if there are multiple variants
  if (variantsArr.length > 1) {
    // Filter arr where children property exists with length > 0
    return arr.filter(item => Array.isArray(item.children) && item.children.length > 0)
  }
  // If only one variant, return arr as is
  return arr
}
