export interface UserFormValues {
  name: string
  mobile: string
  email: string
  password: string
}

export interface CompanyFormValues {
  themeColor: string
  logoId: string
  faviconId: string
  name: string
  supportNumber: string
  supportEmail: string
  address: string
  gstin: string
  subdomain: string
  workspaceUrl: string
  subdomain?: string
  versionName?: string
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
