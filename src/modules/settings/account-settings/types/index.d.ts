interface UserFormValues {
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
  alternate_mobile?: number
  type: PartyType
  // e.g., 'every 10th of the month'
  due_payment_reminder?: string

  // total amount of all transactions
  total_amount: number
  // total paid by/to the party
  paid_amount: number
  // total outstanding
  due_amount: number

  // chronological payment logs
  payment_history: PaymentRecord[]
  // for tracking future promised payments
  payment_promises?: PaymentPromise[]
}
