import type { VariantCombination } from '../types'

export const normalizeVariants = (arr: VariantCombination[], groupBy: string): VariantCombination[] => {
  const parents: Record<string, VariantCombination> = {}
  const childrenByParent: Record<string, VariantCombination[]> = {}

  for (const item of arr) {
    if (item.parent) {
      parents[item.key] = { ...item, children: [] }
    } else {
      const parentKey = item.options?.[groupBy] as string
      if (!childrenByParent[parentKey]) childrenByParent[parentKey] = []
      childrenByParent[parentKey].push(item)
    }
  }

  const result: VariantCombination[] = []

  Object.entries(parents).forEach(([key, parent]) => {
    parent.children = childrenByParent[key] || []
    result.push(parent)
  })

  return result
}
