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
  previousMedia?: VariantMedia[]
  media?: VariantMedia[]
  supplier?: {
    name: string
  }
}

export interface ProductFormValueTypes {
  title: string
  description?: string
  categoryId: string
  costPrice: number
  salePrice: number
  discount: number
  profit: number
  brandId?: string
  tags?: string[]
  status?: string
  supplierId?: string
  showcase?: boolean
  groupBy?: string
  previousMedia?: VariantMedia[]
  variantCombinations?: VariantCombination[]
  variantOptions?: VariantOptionTypes[]
  mediaFiles?: VariantMedia[]
  media?: VariantMedia[]
  uploadMedia?: VariantMedia[]
  seo?: SeoType
}
