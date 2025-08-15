// generate sku from product name and variants

import { kebabCase } from 'lodash'

/**
 *
 * @param productName - product name
 * @param variants - variant name
 * @returns sku
 */
export const generateSku = (productName: string, variants: string): string => {
  const arr: string[] = [productName?.split(' ')[0]]
  const values = variants?.split(' x ')
  arr.push(...values)
  const sku = arr.map(item => item).join('-')

  return kebabCase(sku)
}
