export interface ListDataTypes {
  id: string
  partyId: string
  type: 'purchase' | 'sale'
  date: string
  items: {
    productId: string
    quantity: number
    price?: number // optional if auto-calculated
  }[]
  total: number

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
