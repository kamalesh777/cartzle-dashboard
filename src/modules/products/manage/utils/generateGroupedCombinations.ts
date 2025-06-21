import type { VariantCombination, VariantOptionTypes } from '../types'

/**
 * Generate all possible combinations of variant values
 * @param options Array of options with their values
 * @param groupBy Key to group variants by
 * @returns Array of grouped variants
 */
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
  const result = Object.entries(grouped).map(([label, children]) => {
    return {
      label,
      parent: true,
      key: label,
      children: children.map((item, index) => ({ ...item, key: `${label}-${index}` })),
    }
  })

  return result
}


/**
 * Deduplicate variants
 * @param variants - Array of variants
 * @returns Array of deduplicated variants
 */
export const deduplicateVariants = (variants: VariantCombination[]) => {
  const groupedMap = new Map<string, any>();

  for (const group of variants) {
    const key = group.label;

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        ...group,
        children: [...(group.children || [])]
      });
    } else {
      const existing = groupedMap.get(key);
      const merged = [...existing.children, ...(group.children || [])];

      // Deduplicate children using a Set of keys
      const seen = new Set<string>();
      const uniqueChildren = [];

      for (const child of merged) {
        const childKey = child.label; // or child.key
        if (!seen.has(childKey)) {
          seen.add(childKey);
          uniqueChildren.push(child);
        }
      }

      groupedMap.set(key, {
        ...group,
        children: uniqueChildren
      });
    }
  }

  return Array.from(groupedMap.values());
};
