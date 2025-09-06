import React, { useEffect } from 'react'

import { Layout, Menu, Tag } from 'antd'

import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

// eslint-disable-next-line no-duplicate-imports
import type { MenuProps } from 'antd'
import type { dynamicIconImports } from 'lucide-react/dynamic'

import { renderDynamicIcon } from '@/components/Wrapper/IconWrapper'
import { type AppThunkDispatch, type RootState } from '@/store/index'

import { fetchSideNav } from '@/store/slices/navMenuSlice'
import { getCurrentPath } from '@/utils/commonFunctions'

import { NavLink } from '../Common'
import { CircleRect } from '../Common/SkeletonLoader/ContentLoader'
import LogoWrapper from '../Wrapper/LogoWrapper'

const { Sider } = Layout

interface PropTypes {
  trigger?: null
  collapsed: boolean
  sidenavWidth?: number
  collapseWidth?: number
  setOpenDrawer?: (param: boolean) => void
}

type MenuItem = Required<MenuProps>['items'][number]
type ObjType = 'group'

const SideNav = ({ collapsed, sidenavWidth, collapseWidth, setOpenDrawer }: PropTypes): JSX.Element => {
  const pathname = usePathname()

  const dispatch = useDispatch<AppThunkDispatch>()
  const menuState = useSelector((state: RootState) => state.menu)

  useEffect(() => {
    void dispatch(fetchSideNav())
  }, [dispatch])

  // console.log("menu==", menuState)

  interface MenuObject {
    label?: string
    type?: string
    path: string
    notification: string
    key: string
    icon: string
    children?: MenuObject[]
  }

  function getMenuItemSelectedClass(obj: MenuObject, route: string, start: number, end: number): string {
    const isCurrentPath = getCurrentPath(route, start, end) === obj.path
    // const hasChildren = obj?.children?.length

    if (isCurrentPath) {
      return 'ant-menu-item-selected'
    }
    return ''
  }

  const mapMenuItems = (menuArray: MenuObject[], loopCount = 2): MenuItem[] => {
    return menuArray.map(obj => {
      return {
        type: obj.type as ObjType,
        label:
          obj.type === 'group' ? (
            obj.label
          ) : (
            <NavLink href={obj?.path ?? '#'}>
              {obj.label}
              {obj?.notification != null ? (
                <Tag color="#B06AB3" className="m-0">
                  {obj.notification}
                </Tag>
              ) : null}
            </NavLink>
          ),

        icon: renderDynamicIcon({
          name: obj.icon as keyof typeof dynamicIconImports,
          className: 'lucide-icon-1-4 primary-color',
        }),
        key: obj.key,
        className: getMenuItemSelectedClass(obj, pathname, 0, loopCount),
        children: obj.children ? mapMenuItems(obj.children, 3) : undefined,
        onClick: () => setOpenDrawer && setTimeout(() => setOpenDrawer(false), 600),
      }
    })
  }

  const menuItems = mapMenuItems(menuState.data as MenuObject[])

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
        <LogoWrapper collapsed={collapsed} />
        {/* <div style={{background: '#ddd', height: '60px', margin: '15px'}}></div> */}
      </div>
      {menuState.loading ? (
        <div className="mx-3">
          <CircleRect rowCounts={10} rectHeight={110} circleR={130} viewBox="-50 0 1400 350" />
        </div>
      ) : (
        <Menu
          mode="inline"
          className="menu-height"
          items={menuItems}
          selectedKeys={[getCurrentPath(pathname, 2, 1)]}
        />
      )}
    </Sider>
  )
}

export default SideNav
