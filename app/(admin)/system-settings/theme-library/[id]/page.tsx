import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'

import ThemeBuilder from '@/modules/admin/theme-library/manage/ThemeBuilder'

const ThemeLibraryManagePage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<ThemeBuilder />} customTitle="Theme Builder" />
}

export default ThemeLibraryManagePage
