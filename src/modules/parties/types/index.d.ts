export interface PaymentRecord {
  date: string // e.g., '2025-05-28'
  amount: number // payment amount
  method?: string // optional: 'cash', 'bank transfer', etc.
  note?: string // optional: any remarks
}

export interface PaymentPromise {
  promisedDate: string // e.g., '2025-06-05'
  promisedAmount: number
  note?: string
}

export interface ListDataTypes {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  mobile: number
  alternateMobile?: number
  type: PartyType
  // e.g., 'every 10th of the month'
  duePaymentReminder?: string

  // total amount of all transactions
  totalAmount: number
  // total paid by/to the party
  paidAmount: number
  // total outstanding
  dueAmount: number

  // chronological payment logs
  paymentHistory: PaymentRecord[]
  // for tracking future promised payments
  paymentPromises?: PaymentPromise[]
}
