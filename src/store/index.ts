import { type AnyAction, configureStore, type ThunkDispatch, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import companySlice from './slices/companySlice'
import counterSlice from './slices/counterSlice'
import menuSlice from './slices/navMenuSlice'
import userSlice from './slices/userSlice'
import variantsReducer from './slices/variantsSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    menu: menuSlice,
    company: companySlice,
    variants: variantsReducer,
  },
  middleware: () => new Tuple(thunk),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
