import React from 'react'

import Image from 'next/image'

interface PropTypes {
  collapsed?: boolean
}

const LogoWrapper = ({ collapsed }: PropTypes): JSX.Element => {
  const LOGO_ICON = process.env.NEXT_PUBLIC_BRAND_LOGO_ICON
  const BRAND_LOGO = process.env.NEXT_PUBLIC_BRAND_LOGO

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
