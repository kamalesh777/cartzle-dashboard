import '@/styles/antd-override.scss'
import '@/styles/utility-class.scss'
import '@/styles/color.scss'
import '@/styles/reset.scss'
import '@/styles/globals.scss'

import React, { type PropsWithChildren } from 'react'

import { upperFirst } from 'lodash'

import type { Metadata, ResolvingMetadata } from 'next'

import { RootStyleRegistry } from '@/components/RootStyle'
import StoreProvider from '@/components/StoreProvider'

import ThemeWrapper from '@/components/Wrapper/ThemeWrapper'
import { API_BASE_URL } from '@/constants/ApiConstant'
import { metaTitle } from '@/utils/commonFunctions'
import { fetchServerSide } from '@/utils/fetchServerSide'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // fetch data
  const resp = await fetchServerSide('/company/details')
  const companyDetails = resp.result

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: metaTitle(upperFirst('home')),
    // favicon
    icons: `${API_BASE_URL}/media-srv/${companyDetails?.faviconId}?preview=true&tr=w-32`,
    openGraph: {
      images: [companyDetails?.logoId, ...previousImages],
    },
  }
}

const IndexLayout = async ({ children }: PropsWithChildren): Promise<JSX.Element> => {
  // fetch company details on server side
  const resp = await fetchServerSide(`/company/details`)
  const companyDetails = resp.result

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <RootStyleRegistry>
        <body>
          <StoreProvider>
            <ThemeWrapper companyDetails={companyDetails}>{children}</ThemeWrapper>
          </StoreProvider>
        </body>
      </RootStyleRegistry>
    </html>
  )
}

export default IndexLayout
