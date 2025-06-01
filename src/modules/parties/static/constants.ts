import { PaymentMethods } from '@/constants/AppConstant'

export const PartyTypeOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Both', value: 'both' },
]

export const PaymentOptions = PaymentMethods?.map(item => ({ value: item, label: item }))

export const TransactionTypeOptions = ['Advance', 'Normal', 'Refund'] as const