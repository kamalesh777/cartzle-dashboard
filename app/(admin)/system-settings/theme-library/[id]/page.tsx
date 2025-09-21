import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'

import { SYSTEM_SETTINGS_ROUTE } from '@/constants/AppConstant'
import ThemeBuilder from '@/modules/admin/theme-library/manage/ThemeBuilder'

const ThemeLibraryManagePage = (): JSX.Element => {
  return (
    <DynamicPageLayout MainComp={<ThemeBuilder />} goBackUrl={`${SYSTEM_SETTINGS_ROUTE}/theme-library`} />
  )
}

export default ThemeLibraryManagePage
