interface ProductDataTypes {
  category: string | null
  key: string
  name: string
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
