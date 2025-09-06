import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { CompanyFormValues, UserFormValues } from '@/modules/admin/account-settings/types'

import initialThemeConfig from '@/configs/ThemeConfig'

export interface CompanyState {
  details: {
    user: UserFormValues
    company: CompanyFormValues
  }
}
// Define the initial state using that type
const initialState = {
  ...initialThemeConfig,
  details: {
    user: {},
    company: {},
  } as CompanyState['details'],
  isLoading: true,
}

export const companySlice = createSlice({
  name: 'company',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    applyCompanyData: (state, action: PayloadAction<CompanyState['details']>) => {
      state.details = action.payload
      state.isLoading = false
    },
    applyThemeColor: (state, action: PayloadAction<string>) => {
      if (state.token != null) {
        state.token.colorPrimary = action.payload
        state.token.colorInfo = action.payload
        state.isLoading = false
        // state.token.colorLink = isLightColor(action.payload) ? action.payload : '#fff'
      }
    },
    // update partial company data
    updateCompanyData: (state, action: PayloadAction<Partial<CompanyState['details']>>) => {
      state.details = { ...state.details, ...action.payload }
      state.isLoading = false
    },
  },
})

export const { applyThemeColor, applyCompanyData, updateCompanyData } = companySlice.actions

export default companySlice.reducer
