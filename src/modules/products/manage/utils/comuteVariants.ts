interface OptionTypes {
  op_name: string
  op_value: string[]
}

interface Variant {
  label: string
  value: string[]
}

interface GroupedVariant {
  label: string
  children?: Variant[]
}

/**
 * Generate all possible combinations of variant values
 * @param options Array of options with their values
 * @param groupBy Key to group variants by
 * @returns Array of grouped variants
 */
export const computeVariants = (options: OptionTypes[], groupBy: string): GroupedVariant[] => {
  if (!options || options.length === 0) return []
  // Find the option to group by
  const groupOption = options.find(opt => opt?.op_name === groupBy)
  if (!groupOption) return []

  // Get remaining options
  const restOptions = options.filter(opt => opt?.op_name !== groupBy)

  // Generate all combinations of remaining options
  const getCombinations = (values: string[][], index = 0, current: string[] = [], result: string[][] = []): string[][] => {
    if (index === values.length) {
      result.push([...current])
      return result
    }
    for (const val of values[index]) {
      current[index] = val
      getCombinations(values, index + 1, current, result)
    }
    return result
  }

  const restValues = restOptions.map(opt => opt?.op_value)
  const combinations = getCombinations(restValues)

  // Create children array from combinations
  const getChildren = (groupBy?: string): GroupedVariant['children'] =>
    combinations.flat()?.length > 0
      ? combinations.map(combo => ({
          label: combo.join('/'),
          value: combo,
          key: `child-of-${groupBy}`,
        }))
      : []

  // Create grouped variants
  return groupOption?.op_value?.map(groupValue => ({
    label: groupValue,
    key: `parent-${groupValue}`,
    ...(getChildren(groupValue)?.length ? { children: getChildren(groupValue) } : {}),
  }))
}

// Example usage:
// const options = [
//   { op_name: 'color', op_value: ['red', 'blue'] },
//   { op_name: 'size', op_value: ['S', 'M', 'L'] },
//   { op_name: 'material', op_value: ['cotton', 'silk'] }
// ]
// const variants = computeVariants(options, 'color')
// This will create variants grouped by color with all combinations of size and material
