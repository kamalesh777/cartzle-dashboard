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
  sell_price?: number
  cost_price?: number
  available?: number
  parent?: boolean
  open?: boolean
  key: string
  label: string
  children?: VariantCombination[]
  options?: Record<string, string>
}
