export interface DataType {
  key: React.ReactNode
  name: string
  age: number
  address: string
  children?: DataType[]
}

export interface GroupedVariant {
  dataIndex: string
  label: string
  children: Variant[]
}

export interface Variant {
  label: string
  value: string[]
}

export interface VariantOptionTypes {
  op_name: string
  op_value: string[]
}

export interface VariantCombination {
  sell_price: any
  cost_price: any
  available: any
  open?: boolean
  key: string
  label: string
  children?: VariantCombination[]
  options?: Record<string, string>
}
