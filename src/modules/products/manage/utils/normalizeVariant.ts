import type { VariantCombination } from '../types'

export const normalizeVariants = (arr: VariantCombination[], groupBy: string): VariantCombination[] => {
  const grouped: Record<string, VariantCombination[]> = {}

  // Group all items by their groupBy value
  for (const item of arr) {
    const parentKey = item.options?.[groupBy] as string
    if (!grouped[parentKey]) grouped[parentKey] = []
    grouped[parentKey].push(item)
  }

  const result: VariantCombination[] = []

  for (const [key, items] of Object.entries(grouped)) {
    if (items.length === 1) {
      // ✅ Single element → mark as parent itself
      result.push({
        ...items[0],
        parent: true,
        // children: [],
      })
    } else {
      // ✅ Multiple → create a parent with children
      result.push({
        label: key,
        key,
        parent: true,
        options: { [groupBy]: key },
        children: items.map(i => ({ ...i, parent: false })),
      })
    }
  }

  return result
}
