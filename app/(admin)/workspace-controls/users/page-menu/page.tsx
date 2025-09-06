import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import PageMenuSettingComp from '@/modules/admin/user-controls/page-menu/list'

const PageMenuSettingsPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<PageMenuSettingComp />} />
}

export default PageMenuSettingsPage
