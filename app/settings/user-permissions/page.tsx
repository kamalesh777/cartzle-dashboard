'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import RoleAndPageMenu from '@/modules/settings/user-permissions'

const RolePermissionPage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<RoleAndPageMenu />} isScrollable />
}

export default RolePermissionPage
