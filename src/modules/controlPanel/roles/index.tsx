'use client'

import React from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import { usePathname, useRouter } from 'next/navigation'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper, SpaceWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

import Rolelist from './list'

const RoleSettingComp = (): JSX.Element => {
  const router = useRouter()
  const pathname = usePathname()

  // main component for render
  const mainComp = (
    <>
      <Rolelist />
    </>
  )

  const actionComponent = (
    <SpaceWrapper>
      <Input prefix={<SearchOutlined />} placeholder="Search..." />
      <ButtonWrapper type="primary" onClick={() => router.push(`${pathname}/new-role`)}>
        New Role
      </ButtonWrapper>
    </SpaceWrapper>
  )

  return (
    <>
      <DynamicPageLayout goBackUrl={CONTROL_PANEL_ROUTE} MainComp={mainComp} ActionComp={actionComponent} />
    </>
  )
}

export default RoleSettingComp
