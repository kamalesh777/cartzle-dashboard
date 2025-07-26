/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import { MEDIA_BASE_URL } from '@/constants/ApiConstant'

interface LogoWrapperProps {
  collapsed?: boolean
  className?: string
}

const LogoWrapper: React.FC<LogoWrapperProps> = ({ collapsed, className = '' }) => {
  const { details: company } = useSelector((state: RootState) => state.company)

  const [logoId, setLogoId] = useState('')
  const [faviconId, setFaviconId] = useState('')

  useEffect(() => {
    if (company) {
      setLogoId(company.logoId || process.env.NEXT_PUBLIC_BRAND_LOGO_ID || '')
      setFaviconId(company.faviconId || process.env.NEXT_PUBLIC_BRAND_LOGO_ICON_ID || '')
    }
  }, [company])

  const versionQuery = company?.versionName ? `&v=${company.versionName}` : ''

  const FAVICON_URL = `${MEDIA_BASE_URL}/${faviconId}?preview=true${versionQuery}`
  const LOGO_URL = `${MEDIA_BASE_URL}/${logoId}?preview=true${versionQuery}&tr=w-400`

  const imageProps = collapsed
    ? {
        src: FAVICON_URL,
        width: 50,
        height: 50,
        alt: 'Brand Image Icon',
      }
    : {
        src: LOGO_URL,
        width: 320,
        height: 80,
        alt: 'Brand Logo',
      }

  return (
    <div className={`logo-box ${className}`}>
      <img src={imageProps.src} alt={imageProps.alt} width={imageProps.width} height={imageProps.height} />
    </div>
  )
}

export default LogoWrapper
