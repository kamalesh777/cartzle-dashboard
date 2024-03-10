import '@styles/antd-override.scss'
import '@styles/utility-class.scss'
import '@styles/color.scss'
import '@styles/reset.scss'
import '@styles/globals.scss'
import StoreProvider from '@app/StoreProvider'
import React from 'react'

import { LayoutWrapper } from '@components/Wrapper'
import ThemeWrapper from '@components/Wrapper/ThemeWrapper'
import DashboardComponent from '@modules/Dashboard'
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

export default function RootLayout({}): JSX.Element {
  const isAuth = true
  return (
    <StoreProvider>
      {isAuth ? (
        <ThemeWrapper>
          <LayoutWrapper>
            <DashboardComponent />
          </LayoutWrapper>
        </ThemeWrapper>
      ) : (
        <ThemeWrapper>
          <DashboardComponent />
        </ThemeWrapper>
      )}
    </StoreProvider>
  )
}
