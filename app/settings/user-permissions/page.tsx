'use client'
import React from 'react'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import UserRolePermissionMainComp from '@/modules/settings/user-permissions'

const UserRolePermissions = (): JSX.Element => {
  return <DynamicPageLayout MainComp={<UserRolePermissionMainComp />} />
}

export default UserRolePermissions
