export interface CategoryList {
  id: string
  name: string
  unitGroups: UnitGroupExpand[]
}

export interface UnitsTypes {
  name: string
  id: string
}

export interface UnitGroupExpand {
  id: string
  name: string
  units: UnitsTypes[]
}

export interface UnitGroupPayload {
  id?: string
  name: string
}

export interface UnitsPayload {
  id?: string
  name: string
}

export interface BrandTypePayload {
  id?: string
  name: string
}
