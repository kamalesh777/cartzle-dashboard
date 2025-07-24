import React from 'react'

import Image from 'next/image'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

interface PropTypes {
  collapsed?: boolean
}

// brand logo and icon
const LOGO_ID = process.env.NEXT_PUBLIC_BRAND_LOGO_ID
const LOGO_ICON_ID = process.env.NEXT_PUBLIC_BRAND_LOGO_ICON_ID

const LogoWrapper = ({ collapsed }: PropTypes): JSX.Element => {
  const LOGO_ICON = `${MEDIA_BASE_URL}/${LOGO_ICON_ID}?preview=true`
  const BRAND_LOGO = `${MEDIA_BASE_URL}/${LOGO_ID}?preview=true`

  const logoObj = {
    url: collapsed ? LOGO_ICON : BRAND_LOGO,
    width: collapsed ? 50 : 320,
    height: collapsed ? 50 : 80,
    alt: collapsed ? 'Brand Image Icon' : 'Brand Logo',
  }
  return (
    <div>
      <Image src={logoObj.url as string} alt={logoObj.alt} width={logoObj.width} height={logoObj.height} />
    </div>
  )
}

export default LogoWrapper
