// src/utils/currency.ts

import { EMPTY_PLACEHOLDER } from '@/constants/AppConstant'

// This function is used to format the currency value
export const getCurrency = (value?: string): string => {
  switch (value) {
    case 'inr':
      return '₹'
    case 'usd':
      return '$'
    case 'eur':
      return '€'
    default:
      return '₹'
  }
}
/**
 * This function is used to calculate the margin based on the option
 * @param costPrice - cost price of the product
 * @param salePrice - sale price of the product
 * @param option - option to calculate the margin
 * @returns margin based on the option
 */
export const getProfitMargin = (costPrice: number, salePrice: number, option: string): number | string => {
  if (!costPrice || !salePrice) {
    return EMPTY_PLACEHOLDER
  }
  switch (option) {
    case 'profit':
      return salePrice - costPrice
    case 'margin':
      return Number(((salePrice - costPrice) / costPrice) * 100).toFixed(2)
    default:
      return salePrice - costPrice
  }
}
