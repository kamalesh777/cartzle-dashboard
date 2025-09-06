import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import PermissionListComp from '@/modules/admin/user-controls/permissions/list'

const PermissionMainPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<PermissionListComp />} />
}

export default PermissionMainPage
