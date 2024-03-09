import { type AnyAction, configureStore, type ThunkDispatch, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import counterSlice from './slice/counterSlice'
import menuSlice from './slice/navMenuSlice'
import themeSlice from './slice/themeSlice'
import userSlice from './slice/userSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    menu: menuSlice,
    theme: themeSlice,
  },
  middleware: () => new Tuple(thunk),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>
