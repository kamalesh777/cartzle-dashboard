'use client'
import { ConfigProvider } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
// eslint-disable-next-line no-duplicate-imports
import type { PropsWithChildren } from 'react'
import type { RootState } from 'src/store'
import { hexToRGBA } from '@utils/commonFunctions'

const ThemeWrapper = (props: PropsWithChildren): JSX.Element => {
  const theme = useSelector((state: RootState) => state.theme)

  return (
    <ConfigProvider theme={theme}>
      <style jsx global>{`
        :root {
          --primary-color: ${theme.token?.colorPrimary};
          --primary-border-color: ${theme.token?.colorPrimary};
          --primary-outline-color: ${theme.token?.colorPrimary};
          --primary-bg-color-1: ${hexToRGBA(theme.token?.colorPrimary as string, 1)};
          --primary-bg-color-2: ${hexToRGBA(theme.token?.colorPrimary as string, 0.3)};
          --primary-bg-color-3: ${hexToRGBA(theme.token?.colorPrimary as string, 0.6)};
          --primary-bg-color-4: ${hexToRGBA(theme.token?.colorPrimary as string, 0.08)};
        }
      `}</style>
      {props.children}
    </ConfigProvider>
  )
}

export default ThemeWrapper
