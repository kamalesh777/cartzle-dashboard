import React from 'react'
import RolesListComp from './roles/list'
import PermissionsListComp from './permissions/list'
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