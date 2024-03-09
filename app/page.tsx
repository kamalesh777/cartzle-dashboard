import '@styles/antd-override.scss'
import '@styles/utility-class.scss'
import '@styles/color.scss'
import '@styles/reset.scss'
import '@styles/globals.scss'
import React from 'react'
import { Provider } from 'react-redux'
import { RootStyleRegistry } from './RootStyle'
import type { AppProps } from 'next/app'
import { LayoutWrapper } from '@components/Wrapper'
import ThemeWrapper from '@components/Wrapper/ThemeWrapper'
import { metaTitle } from '@utils/commonFunctions'
import { store } from 'src/store'

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

export default function RootLayout({ Component, pageProps }: AppProps): JSX.Element {
  const authURL = false
  return (
    <html lang="en">
      <RootStyleRegistry>
        <body>
          <Provider store={store}>
            {authURL ? (
              <ThemeWrapper>
                <LayoutWrapper>
                  <Component {...pageProps} />
                </LayoutWrapper>
              </ThemeWrapper>
            ) : (
              <ThemeWrapper>
                <Component {...pageProps} />
              </ThemeWrapper>
            )}
          </Provider>
        </body>
      </RootStyleRegistry>
    </html>
  )
}
