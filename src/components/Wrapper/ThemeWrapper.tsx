'use client'
import React, { useEffect, type PropsWithChildren } from 'react'

import { ConfigProvider, theme } from 'antd'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import type { CompanyFormValues } from '@/modules/settings/account-settings/types'

// eslint-disable-next-line no-duplicate-imports
import type { ThemeConfig } from 'antd'

import type { RootState } from 'src/store'

import { applyCompanyData, applyThemeColor } from '@/store/slices/companySlice'

import LayoutWrapper from './LayoutWrapper'

interface PropTypes {
  companyDetails: CompanyFormValues
  children: React.ReactNode
}
const ThemeWrapper = ({ children, companyDetails }: PropTypes): JSX.Element => {
  const dispatch = useDispatch()
  const companyState = useSelector((state: RootState) => state?.company)

  const pathname = usePathname()
  const isAuth = pathname.startsWith('/auth')

  useEffect(() => {
    if (companyDetails) {
      dispatch(applyCompanyData(companyDetails))
      dispatch(applyThemeColor(companyDetails.themeColor))
    }
  }, [companyDetails])

  return (
    <ConfigProvider theme={companyState as ThemeConfig}>
      <ThemeToken>{!isAuth ? <LayoutWrapper>{children}</LayoutWrapper> : children}</ThemeToken>
    </ConfigProvider>
  )
}

const { useToken } = theme

// use the theme token and pass it by global css
const ThemeToken = (props: PropsWithChildren): JSX.Element => {
  const { token } = useToken()

  return (
    <>
      <style jsx global>
        {`
          :root {
            --primary-color: ${token?.colorPrimary};
            --primary-border-color: ${token?.colorPrimaryBorder};
            --primary-hover-color: ${token?.colorPrimaryHover};
            --primary-bg-color: ${token?.colorPrimaryBg};
            --error-color: ${token?.colorError};
            --error-color-bg: ${token?.colorErrorBg};
            --success-color: ${token?.colorSuccess};
            --success-color-bg: ${token?.colorSuccessBg};
            --warning-color: ${token?.colorWarning};
            --warning-color-bg: ${token?.colorWarningBg};
          }
        `}
      </style>
      {props.children}
    </>
  )
}

export default ThemeWrapper
