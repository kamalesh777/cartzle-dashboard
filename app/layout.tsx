import '@styles/antd-override.scss'
import '@styles/utility-class.scss'
import '@styles/color.scss'
import '@styles/reset.scss'
import '@styles/globals.scss'

import React, { type PropsWithChildren } from 'react'

import { RootStyleRegistry } from '@components/RootStyle'
import StoreProvider from '@components/StoreProvider'
import { LayoutWrapper } from '@components/Wrapper'
import ThemeWrapper from '@components/Wrapper/ThemeWrapper'

import { metaTitle } from '@utils/commonFunctions'

export const metadata = {
  title: metaTitle('Home'),
  generator: 'A Ecommerce platform for daily shopping',
  applicationName: process.env.NEXT_PUBLIC_BRAND_NAME,
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Kamalesh Maity' }, { name: 'Kamalesh' }],
  // creator: 'Kamalesh Maity',
  // publisher: 'Sebastian Markbåge',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

const IndexLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const isAuth = true
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <RootStyleRegistry>
        <body>
          <StoreProvider>
            {isAuth ? (
              <ThemeWrapper>
                <LayoutWrapper>{children}</LayoutWrapper>
              </ThemeWrapper>
            ) : (
              <ThemeWrapper>{children}</ThemeWrapper>
            )}
          </StoreProvider>
        </body>
      </RootStyleRegistry>
    </html>
  )
}

export default IndexLayout
