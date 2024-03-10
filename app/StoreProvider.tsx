'use client'

import { Provider } from 'react-redux'

import { store } from 'src/store'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
