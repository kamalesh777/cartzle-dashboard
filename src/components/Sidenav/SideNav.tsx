import React, { useEffect } from 'react'

import { Layout, Menu, Tag } from 'antd'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from '@/components/Common/NavLink'
import { CircleRect } from '@/components/Common/SkeletonLoader'
import { renderDynamicIcon } from '@/components/Wrapper/IconWrapper'
import { type AppThunkDispatch, type RootState } from '@/store/index'

import { fetchSideNav } from '@/store/slice/navMenuSlice'
import { getCurrentPath } from '@/utils/commonFunctions'

const { Sider } = Layout

interface PropTypes {
  trigger?: null
  collapsed: boolean
  sidenavWidth?: number
  collapseWidth?: number
  setOpenDrawer?: (p: boolean) => void
}

const SideNav = ({ collapsed, sidenavWidth, collapseWidth, setOpenDrawer }: PropTypes): JSX.Element => {
  const path = usePathname()
  const currentPath = getCurrentPath(path)

  const dispatch = useDispatch<AppThunkDispatch>()
  const menuState = useSelector((state: RootState) => state.menu)

  useEffect(() => {
    void dispatch(fetchSideNav())
  }, [dispatch])

  // console.log("menu==", menuState)

  const logoObj = {
    url: collapsed ? '/LMC_icon.png' : '/LMC_logo.png',
    width: collapsed ? 50 : 240,
    height: collapsed ? 50 : 70,
    alt: collapsed ? 'Brand Image Icon' : 'Brand Logo',
  }

  
  return (
    <Sider
      trigger={null}
      width={sidenavWidth}
      collapsedWidth={collapseWidth}
      collapsible
      collapsed={collapsed}
      className="min-height-100vh fix-sidebar border-right"
    >
      <div className="logo justify-content-center">
        <img src={logoObj.url} alt={logoObj.alt} width={logoObj.width} height={logoObj.height} />
        {/* <div style={{background: '#ddd', height: '60px', margin: '15px'}}></div> */}
      </div>
      {menuState.loading ? (
        <div className="mx-3">
          <CircleRect
            rowCounts={10}
            rectHeight={70}
            circleCx={70}
            circleCy={70}
            circleR={70}
            viewBox="-50 0 1000 200"
            rectY={30}
          />
        </div>
      ) : (
        <Menu className="menu-height" defaultSelectedKeys={['dashboard']} selectedKeys={[currentPath]}>
          {menuState.data.map(obj => (
            <Menu.Item 
              key={obj.key} 
              icon={renderDynamicIcon(obj.icon)}
              onClick={() => setOpenDrawer && setTimeout(() => setOpenDrawer(false), 600)}>
              <NavLink href={obj.path}>
                <span>
                  {obj.title}
                  {obj?.notification != null ? (
                    <Tag color="#B06AB3" className="m-0">
                      {obj?.notification}
                    </Tag>
                  ) : null}
                </span>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Sider>
  )
}

export default SideNav
