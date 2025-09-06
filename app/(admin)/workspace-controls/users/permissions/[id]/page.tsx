'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import PermissionsManageComp from '@/modules/admin/user-controls/permissions/manage'

const PermissionManagePage = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<PermissionsManageComp />} />
}

export default PermissionManagePage
