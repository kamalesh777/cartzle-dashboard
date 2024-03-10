import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Axios from 'axios'

import type { dataResponse } from '@utils/allTypes'
// eslint-disable-next-line import/named

// First, create the thunk
export const fetchToDo = createAsyncThunk('users/fetchToDo', async () => {
  const response = await Axios.get('https://jsonplaceholder.typicode.com/todos')
  return response.data as dataResponse
})

interface UsersState {
  data: Array<{
    completed: boolean
    id: number
    title: string
    userId: number
  }>
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const initialState = {
  data: [
    {
      title: '',
    },
  ],
  loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: builder => {
    builder.addCase(fetchToDo.pending, state => {
      // Add user to the state array
      state.loading = 'pending'
    })
    builder.addCase(fetchToDo.fulfilled, state => {
      // state.data = action.payload
      state.loading = 'succeeded'
    })
    builder.addCase(fetchToDo.rejected, state => {
      state.loading = 'failed'
      state.data = []
    })
  },
})

export default usersSlice.reducer
