import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ThemeConfig } from 'antd'

// Define the initial state using that type
const initialState: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: 'rgba(22, 119, 255, 1)',
    // colorLink: 'red'
    // colorTextBase: '#eee',
    // borderRadius: 20
  },
}

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    applyColor: (state, action: PayloadAction<string>) => {
      if (state.token != null) {
        state.token.colorPrimary = action.payload
        // state.token.colorLink = isLightColor(action.payload) ? action.payload : '#fff'
      }
    },
  },
})

export const { applyColor } = themeSlice.actions

export default themeSlice.reducer
