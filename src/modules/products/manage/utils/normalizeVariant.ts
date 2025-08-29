import type { VariantCombination, VariantOptionTypes } from '../types'

export function filterProducts(
  arr: VariantCombination[],
  variantOptions: VariantOptionTypes[],
  flatten = false,
): VariantCombination[] {
  let result
  // Logic for filtering based on variantOptions length
  if (variantOptions.length > 1) {
    result = arr.filter(item => Array.isArray(item.children) && item.children.length > 0)
  } else {
    result = arr
  }
  // If flatten is true, flatten all children into a single array
  if (flatten) {
    // Map children from parent items and concatenate with parents, only if parents have children
    const children = result
      .filter(item => Array.isArray(item.children) && item.children.length > 0)
      .flatMap(item => item.children)
    // Combine parent items (without children property to avoid duplication) + children
    return [
      ...result.map(item => {
        const copy = { ...item }
        delete copy.children
        return copy
      }),
      ...children,
    ] as VariantCombination[]
  }
  // Otherwise, return as filtered
  return result
}

export function groupByParent(flatArr: VariantCombination[], groupByKey: string): VariantCombination[] {
  const parentMap = new Map()

  // First pass: register all parents in the map
  flatArr.forEach(item => {
    if (item.parent) {
      // Get the key value for grouping for parent — either directly or in options
      const keyValue =
        item[groupByKey as keyof VariantCombination] || (item.options && item.options[groupByKey])

      if (keyValue) {
        // Create a shallow copy to avoid mutating original objects and add empty children array
        parentMap.set(keyValue, { ...item, children: [] })
      }
    }
  })

  // Second pass: assign children to their parents
  flatArr.forEach(item => {
    if (!item.parent) {
      // Children usually have groupByKey in their options, fallback to direct property if exists
      const keyValue =
        (item.options && item.options[groupByKey as keyof VariantCombination]) ||
        item[groupByKey as keyof VariantCombination]
      if (keyValue && parentMap.has(keyValue)) {
        parentMap.get(keyValue).children.push(item)
      }
    }
  })

  // Return array of parents with nested children
  return Array.from(parentMap.values())
}
