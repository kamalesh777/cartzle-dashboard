'use client'

import React, { useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, SpaceWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

import CreateUserModaComp from './create'
import UserSettingList from './list'

const UserSettingComp = (): JSX.Element => {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  // main component for render
  const mainComp = (
    <>
      <UserSettingList />
      {openCreateModal && <CreateUserModaComp open={openCreateModal} setOpen={setOpenCreateModal} />}
    </>
  )

  const actionComponent = (
    <SpaceWrapper>
      <Input prefix={<SearchOutlined />} placeholder="Search..." />
      <ButtonWrapper type="primary" onClick={() => setOpenCreateModal(true)}>
        Add
      </ButtonWrapper>
    </SpaceWrapper>
  )

  return <DynamicPageLayout goBackUrl={CONTROL_PANEL_ROUTE} MainComp={mainComp} ActionComp={actionComponent} />
}

export default UserSettingComp
