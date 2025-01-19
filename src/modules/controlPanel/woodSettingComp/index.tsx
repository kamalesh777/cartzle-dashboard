import React from 'react'

import { SearchOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'

import DynamicPageLayout from '@/components/DynamicPageLayout'
import { ButtonWrapper } from '@/components/Wrapper'
import { CONTROL_PANEL_ROUTE } from '@/constants/AppConstant'

import WoodSettingList from './list'

const WoodSettingComp = (): JSX.Element => {
  const mainComp = <WoodSettingList />
  const actionComponent = (
    <Space>
      <Input prefix={<SearchOutlined />} placeholder="Search..." />
      <ButtonWrapper type="primary">New</ButtonWrapper>
    </Space>
  )
  return <DynamicPageLayout goBackUrl={CONTROL_PANEL_ROUTE} MainComp={mainComp} ActionComp={actionComponent} />
}

export default WoodSettingComp
