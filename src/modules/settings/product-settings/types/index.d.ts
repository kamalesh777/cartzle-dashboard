export interface CategoryList {
    id: string
    name: string
    unit_type: string
    units: string
}

export interface CategoryPayload {
    name: string
    unit_type: {
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