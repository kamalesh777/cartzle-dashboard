export interface ProductDataTypes {
  id: string
  category: string | null
  key: string
  title: string
  width: number
  thickness: number
  length: number
  stock: number
  purchasePrice: number
  salePrice: number
  supplier?: {
    name: string
  }
}

export interface ProductFormValueTypes {
  title: string
  category: keyof (typeof categoriesOptions)[number]['value']
  description?: string
  thickness: number
  width: number
  length: number
  unit: string
  party: string
  is_supplier: boolean
  cost_price: number
  sale_price: number
  wood_type: string
  // product_image: strings[]
}
