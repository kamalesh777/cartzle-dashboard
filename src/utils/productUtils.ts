// generate sku from product name and variants
/**
 *
 * @param productName - product name
 * @param category - category name
 * @param variants - variant name
 * @returns sku
 */
export const generateSku = (productName: string, category: string, variants: string): string => {
  const arr: string[] = [productName, category]
  const values = variants?.split(' x ')
  arr.push(...values)
  const sku = arr.map(item => item?.toLowerCase().substring(0, 4)).join('-')

  return sku
}
