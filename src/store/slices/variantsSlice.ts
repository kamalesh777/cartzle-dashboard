import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { VariantCombination, VariantOptionTypes } from '@/modules/products/manage/types'

interface VariantsState {
  variantsTable: VariantCombination[]
  variants: VariantOptionTypes[]
  groupBy: string
}

const initialState: VariantsState = {
  variantsTable: [],
  variants: [],
  groupBy: ''
}

const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    setVariants: (state, action: PayloadAction<VariantOptionTypes[]>) => {
      state.variants = action.payload
    },
    setGroupBy: (state, action: PayloadAction<string>) => {
      state.groupBy = action.payload
    },
    setVariantsTable: (state, action: PayloadAction<VariantCombination[]>) => {
      state.variantsTable = action.payload
    },
  },
})

export const { setVariants, setGroupBy, setVariantsTable } = variantsSlice.actions

export default variantsSlice.reducer
