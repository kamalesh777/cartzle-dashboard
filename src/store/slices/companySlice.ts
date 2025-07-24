import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ThemeConfig } from 'antd'

import initialThemeConfig from '@/configs/ThemeConfig'

// Define the initial state using that type
const initialState: ThemeConfig = initialThemeConfig

export const companySlice = createSlice({
  name: 'company',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    applyThemeColor: (state, action: PayloadAction<string>) => {
      if (state.token != null) {
        state.token.colorPrimary = action.payload
        state.token.colorInfo = action.payload
        // state.token.colorLink = isLightColor(action.payload) ? action.payload : '#fff'
      }
    },
  },
})

export const { applyThemeColor } = companySlice.actions

export default companySlice.reducer
