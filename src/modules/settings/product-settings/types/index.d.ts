export interface CategoryList {
  id: string
  name: string
  unitType: string
  units: string
}

export interface CategoryPayload {
  name: string
  unitType: {
    id: string
    units: string[]
  }[]
}

export interface UnitTypePayload {
  id?: string
  name: string
}

export interface UnitsPayload {
  id?: string
  value: string
}

export interface BrandTypePayload {
  id?: string
  name: string
}
