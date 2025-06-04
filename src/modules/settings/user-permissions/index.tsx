import React from 'react'

import PageMenuList from './page-menu/list'
import PermissionList from './permissions/list'
import RolesListComp from './roles/list'

const UserRolePermissionMainComp = (): JSX.Element => {
  return (
    <>
      <PageMenuList />
      <RolesListComp />
      <PermissionList />
    </>
  )
}

export default UserRolePermissionMainComp
