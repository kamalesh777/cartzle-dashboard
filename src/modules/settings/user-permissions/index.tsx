import React from 'react'

import PageMenuList from './page-menu/list'
import PermissionList from './permissions/list'

const UserRolePermissionMainComp = (): JSX.Element => {
  return (
    <>
      <PageMenuList />
      <PermissionList />
    </>
  )
}

export default UserRolePermissionMainComp
