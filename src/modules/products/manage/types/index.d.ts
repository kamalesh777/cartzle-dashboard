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
  opName: string
  opValue: string[]
}

export interface VariantCombination {
  label: string
  key: string
  parent?: boolean
  sellPrice?: number
  costPrice?: number
  available?: number
  sku?: string
  children?: VariantCombination[]
}

type VariantItem = {
  label: string
  key: string
  sellPrice?: number
  costPrice?: number
  available?: number
  options: Record<string, string>
}
export interface CategoryType {
  name: string
  id: string
}

export interface UnitGroupType {
  name: string
  id: string
  units: {
    name: string
    id: string
  }
}
export interface CategoryDetails extends CategoryType {
  unitGroups: UnitGroupType[]
}

export interface TabProps {
  form: FormInstance
}

export interface VariantMedia {
  fileId: string
  name: string
  isPrimary: boolean
}

export type PositionType = 'left' | 'right'

export interface MetaType {
  title: string
  description: string
  ogTitle: string
  ogImage: string
}
