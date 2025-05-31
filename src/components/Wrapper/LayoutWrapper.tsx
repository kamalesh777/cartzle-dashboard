'use client'
import React, { useState, type ReactNode } from 'react'

import { Drawer } from 'antd'

import HeaderNav from '@/components/Header/HeaderNav'
import SideNav from '@/components/Sidenav/SideNav'
import useDevice from '@/hook/useDevice'

interface LayoutProps {
  children: ReactNode
}
const LayoutWrapper = ({ children }: LayoutProps): JSX.Element => {
  const { isMobileDevice } = useDevice()
  const [collapsed, setCollapsed] = useState(false)
  const [openDrwaer, setOpenDrawer] = useState(false)

  const onClose = (): void => {
    setOpenDrawer(false)
  }

  const sidenavWidth = 260
  const collapseWidth = 80
  // if it is mobile device then margin width will be 0 otherwise it will check for collapsed value and return respective value
  const marginWidth = isMobileDevice ? 0 : collapsed ? collapseWidth : sidenavWidth

  return (
    <>
      <HeaderNav {...{ collapsed, setCollapsed, marginWidth, setOpenDrawer }} />
      <main className="main-cont-wrap min-vh-100" style={{ marginLeft: marginWidth }}>
        {children}
      </main>
      {/* Side Nav according to the mobile device responsive */}
      {isMobileDevice ? (
        <Drawer width={collapsed ? collapseWidth : sidenavWidth} onClose={onClose} placement="left" open={openDrwaer}>
          <SideNav trigger={null} collapsed={collapsed} {...{ sidenavWidth, collapseWidth, setOpenDrawer }} />
        </Drawer>
      ) : (
        <SideNav trigger={null} collapsed={collapsed} {...{ sidenavWidth, collapseWidth }} />
      )}
    </>
  )
}

export default LayoutWrapper
