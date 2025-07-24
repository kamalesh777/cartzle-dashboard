import '@/styles/antd-override.scss'
import '@/styles/utility-class.scss'
import '@/styles/color.scss'
import '@/styles/reset.scss'
import '@/styles/globals.scss'

import React, { type PropsWithChildren } from 'react'

import { RootStyleRegistry } from '@/components/RootStyle'
import StoreProvider from '@/components/StoreProvider'

import ThemeWrapper from '@/components/Wrapper/ThemeWrapper'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'
import { metaTitle } from '@/utils/commonFunctions'

export const metadata = {
  title: metaTitle('Home'),
  description: 'An E-commerce platform for daily shopping',
  favicon: `${MEDIA_BASE_URL}/68824c5f5c7cd75eb8d8f6e6?preview=true`,
  generator: 'An E-commerce platform for daily shopping',
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
