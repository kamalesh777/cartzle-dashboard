export const PartyTypeOptions = [
  { label: 'Customer', value: 'customer' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Both', value: 'both' },
]

//* Don't change or arrange the below constant it will cause error for AddPaymentModal.tsx */
export const TransactionTypeOptions = ['advance', 'normal', 'refund', 'missed'] as const