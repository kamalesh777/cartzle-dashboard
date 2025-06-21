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
  label: string;
  key: string;
  parent?: boolean;
  sell_price?: number;
  cost_price?: number;
  available?: number;
  children: VariantItem[];
}


type VariantItem = {
  label: string;
  key: string;
  sell_price?: number;
  cost_price?: number;
  available?: number;
  options: Record<string, string>;
};