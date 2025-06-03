import React from 'react'

import PageMenuList from './page-menu/list'
import RolePermissionList from './roles/list'

const RolePermissionComp = (): JSX.Element => {
  return (
    <>
      <PageMenuList />
      <RolePermissionList />
    </>
  )
}

export default RolePermissionComp
