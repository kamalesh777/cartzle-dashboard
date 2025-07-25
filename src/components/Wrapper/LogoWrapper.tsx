import React from 'react'

import Image from 'next/image'

import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

interface PropTypes {
  collapsed?: boolean
}

const LogoWrapper = ({ collapsed }: PropTypes): JSX.Element => {
  const { details: companyData } = useSelector((state: RootState) => state.company)

  // brand logo and icon
  const LOGO_ID = companyData?.logoId || process.env.NEXT_PUBLIC_BRAND_LOGO_ID
  const LOGO_ICON_ID = companyData?.faviconId || process.env.NEXT_PUBLIC_BRAND_LOGO_ICON_ID

  const LOGO_ICON = `${MEDIA_BASE_URL}/${LOGO_ICON_ID}?v=${Date.now()}&preview=true`
  const BRAND_LOGO = `${MEDIA_BASE_URL}/${LOGO_ID}?v=${Date.now()}&preview=true`

  const logoObj = {
    url: collapsed ? LOGO_ICON : BRAND_LOGO,
    width: collapsed ? 50 : 320,
    height: collapsed ? 50 : 80,
    alt: collapsed ? 'Brand Image Icon' : 'Brand Logo',
  }
  return (
    <div className="logo-box">
      <Image src={logoObj.url as string} alt={logoObj.alt} layout="fill" objectFit="contain" objectPosition="center" />
    </div>
  )
}

export default LogoWrapper
