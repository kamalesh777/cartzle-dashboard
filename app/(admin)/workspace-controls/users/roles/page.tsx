import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import RolesListComp from '@/modules/admin/user-controls/roles/list'

const RolesPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<RolesListComp />} />
}

export default RolesPage
