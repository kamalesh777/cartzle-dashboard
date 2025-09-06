import React from 'react'

import PermissionsListComp from './permissions/list'
import RolesListComp from './roles/list'
import PageMenuSettingComp from './section-controls/list'

const UserControlsComp = (): JSX.Element => {
  return (
    <>
      <RolesListComp />
      <PermissionsListComp />
      <PageMenuSettingComp />
    </>
  )
}

export default UserControlsComp
