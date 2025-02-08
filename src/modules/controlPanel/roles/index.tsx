'use client'

import React, { useState } from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

import CreateUserModaComp from './create'
import UserSettingList from './list'

const RoleSettingComp = (): JSX.Element => {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  // main component for render
  const mainComp = (
    <>
      <UserSettingList />
      {openCreateModal && <CreateUserModaComp open={openCreateModal} setOpen={setOpenCreateModal} />}
    </>
  )

  const actionComponent = (
    <Space>
      <Input prefix={<SearchOutlined />} placeholder="Search..." />
      <ButtonWrapper type="primary" onClick={() => setOpenCreateModal(true)}>
        Add
      </ButtonWrapper>
    </Space>
  )

  return <DynamicPageLayout goBackUrl={CONTROL_PANEL_ROUTE} MainComp={mainComp} ActionComp={actionComponent} />
}

export default RoleSettingComp
