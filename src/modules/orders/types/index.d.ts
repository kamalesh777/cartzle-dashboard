import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export interface ListDataTypes {
  id: string
  partyId: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  mobile: number
  alternate_mobile: number
  is_supplier?: 'yes' | 'no' | 'both'
  type: 'purchase' | 'sale'
  date: string
  due_payment_reminder?: string
  product_items: {
    productId: string
    quantity: number
    price?: number // optional if auto-calculated
  }[]
  total_amount: number
  due_amount: number
  payment_details?: { date: string; payment_amount: number }[]
  payment_history: {
    paid_amount: number
    paid_on: string // actual payment date
    promised_on?: string // optional future commitment
    mode?: 'cash' | 'bank' | 'upi' | 'cheque'
    note?: string // optional remarks
  }[]

  paid: number // auto-calculated from payment_history
  due: number // = total - paid
}

export interface MainFormValueTypes {
  name: string
  category: keyof (typeof categoriesOptions)[number]['value']
  description?: string
  thickness: number
  width: number
  length: number
  unit: string
  party: string
  is_supplier: boolean
  cost_price: number
  sale_price: number
  wood_type: string
  // product_image: strings[]
}

export interface PageTypes extends Params {
  type: 'purchases' | 'sales'
}
