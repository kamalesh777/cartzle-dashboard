import '@/styles/antd-override.scss'
import '@/styles/utility-class.scss'
import '@/styles/color.scss'
import '@/styles/reset.scss'
import '@/styles/globals.scss'

import React, { type PropsWithChildren } from 'react'

import { RootStyleRegistry } from '@/components/RootStyle'
import StoreProvider from '@/components/StoreProvider'

import ThemeWrapper from '@/components/Wrapper/ThemeWrapper'

const IndexLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <RootStyleRegistry>
        <body>
          <StoreProvider>
            <ThemeWrapper>{children}</ThemeWrapper>
          </StoreProvider>
        </body>
      </RootStyleRegistry>
    </html>
  )
}

export default IndexLayout
