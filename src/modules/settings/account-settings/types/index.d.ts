export interface UserFormValues {
  name: string
  mobile: string
  email: string
  password: string
}

interface CompanyFormValues {
  name: string
  support_number: string
  support_email: string
  address: string
}

export interface MainFormValues {
  company: CompanyFormValues
  user: UserFormValues
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
