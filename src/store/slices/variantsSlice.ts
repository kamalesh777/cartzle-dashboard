import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { UnitGroupType, VariantCombination } from '@/modules/products/manage/types'

interface VariantsState {
  variantsTable: VariantCombination[]
  options: UnitGroupType[]
  groupBy: string
}

const initialState: VariantsState = {
  variantsTable: [],
  options: [],
  groupBy: '',
}

const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setVariantOptions: (state, action: PayloadAction<UnitGroupType[]>) => {
      state.options = action.payload
    },
    setGroupBy: (state, action: PayloadAction<string>) => {
      state.groupBy = action.payload
    },
    setVariantsTable: (state, action: PayloadAction<VariantCombination[]>) => {
      state.variantsTable = action.payload
    },
  },
})

export const { setVariantOptions, setGroupBy, setVariantsTable } = variantsSlice.actions

export default variantsSlice.reducer
