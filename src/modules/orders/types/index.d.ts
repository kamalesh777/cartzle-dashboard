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
  alternateMobile: number
  isSupplier?: 'yes' | 'no' | 'both'
  type: 'purchase' | 'sale'
  date: string
  duePaymentReminder?: string
  productItems: {
    productId: string
    quantity: number
    price?: number // optional if auto-calculated
  }[]
  totalAmount: number
  dueAmount: number
  paymentHistory: {
    paidAmount: number
    paidOn: string // actual payment date
    promisedOn?: string // optional future commitment
    mode?: 'cash' | 'bank' | 'upi' | 'cheque'
    note?: string // optional remarks
  }[]
  paid: number // auto-calculated from paymentHistory
  due: number // = total - paid
  paymentDetails?: { date: string; paymentAmount: number }[]

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
  isSupplier: boolean
  costPrice: number
  salePrice: number
  woodType: string
  // productImage: strings[]
}

export interface PageTypes extends Params {
  type: 'purchases' | 'sales'
}
