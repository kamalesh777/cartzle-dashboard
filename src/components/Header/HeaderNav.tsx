import React from 'react'

import { MenuFoldOutlined, MenuUnfoldOutlined, PoweroffOutlined } from '@ant-design/icons'
import { Avatar, Layout, type MenuProps, Row } from 'antd'
import { capitalize } from 'lodash'

// import { useLogoutHandler } from 'src/hook/useAuth'

import { useRouter } from 'next/navigation'

import { useSelector } from 'react-redux'

import type { RootState } from '@/store/index'

import useDevice from 'src/hook/useDevice'

import { ButtonWrapper, ColWrapper, DropdownWrapper, SpaceWrapper } from '../Wrapper'

const { Header } = Layout
interface PropTypes {
  collapsed: boolean
  setCollapsed: (param: boolean) => void
  marginWidth: number
  setOpenDrawer: (param: boolean) => void
}
const HeaderNav = ({ collapsed, setCollapsed, marginWidth, setOpenDrawer }: PropTypes): JSX.Element => {
  const router = useRouter()
  const { user } = useSelector((state: RootState) => state.company?.details)
  // const userInfo = useSelector((state: RootState) => state.userState.userInfo)

  const { isMobileDevice } = useDevice()
  // const { logout } = useLogoutHandler()

  const showDrawer = (): void => {
    setOpenDrawer(true)
  }

  const menuItems: MenuProps['items'] = [
    {
      key: 'sign-out',
      label: (
        <SpaceWrapper className="error-color">
          <PoweroffOutlined />
          Log Out
        </SpaceWrapper>
      ),
      onClick: () => router.push('/auth/logout'),
    },
  ]

  return (
    <Header
      style={{
        left: collapsed ? `${marginWidth}px` : `${marginWidth}px`,
      }}
      className="bg-white fix-header"
    >
      <Row align="middle" className="w-100">
        <ColWrapper span={12}>
          <div className="header-left-panel">
            <ButtonWrapper
              className="text-default"
              type="link"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => (isMobileDevice ? showDrawer() : setCollapsed(!collapsed))}
            />
          </div>
        </ColWrapper>
        <ColWrapper span={12}>
          <div className="text-right">
            <DropdownWrapper
              overlayStyle={{ minWidth: '200px' }}
              menu={{ items: menuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <div className="cursor-pointer">
                <SpaceWrapper className="profile-nav" align="center">
                  <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} size={32} />
                  {capitalize(user?.name)}
                </SpaceWrapper>
              </div>
            </DropdownWrapper>
          </div>
        </ColWrapper>
      </Row>
    </Header>
  )
}

export default HeaderNav
