import { PaymentMethods } from '@/constants/AppConstant'

export const PartyTypeOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Both', value: 'both' },
]

export const PaymentOptions = PaymentMethods?.map(item => ({ value: item, label: item }))

//* Don't change or arrange the below constant it will cause error for AddPaymentModal.tsx */
export const TransactionTypeOptions = ['advance', 'normal', 'refund', 'missed'] as const