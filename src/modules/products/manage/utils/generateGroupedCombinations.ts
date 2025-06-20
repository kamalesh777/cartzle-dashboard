import type { VariantCombination, VariantOptionTypes } from '../types'

export const generateGroupedCombinations = (options: VariantOptionTypes[], groupBy: string): VariantCombination[] => {
  const allCombinations: Array<{ label: string; options: Record<string, string> }> = []

  const recurse = (depth = 0, current: string[] = [], optionMap: Record<string, string> = {}): void => {
    if (depth === options.length) {
      allCombinations.push({
        label: current.join('/'),
        options: { ...optionMap },
      })
      return
    }

    const { op_name, op_value } = options[depth]
    for (const value of op_value) {
      recurse(depth + 1, [...current, value], {
        ...optionMap,
        [op_name]: value,
      })
    }
  }

  recurse()

  // Group by selected option key
  const grouped: Record<string, typeof allCombinations> = {}
  for (const item of allCombinations) {
    const key = item.options[groupBy]
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(item)
  }

  // Format the grouped result
  const result = Object.entries(grouped).map(([label, children]) => ({
    label,
    children,
  }))

  return result
}
