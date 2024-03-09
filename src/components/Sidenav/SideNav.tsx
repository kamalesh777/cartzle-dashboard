/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon, * as IconObj from '@ant-design/icons'
import { NavLink } from '@components/Common/NavLink'
import { CircleRect } from '@components/Common/SkeletonLoader'
import NextImage from '@components/NextImage'
// import sidenavData from '@constants/menuData.json'
import { Layout, Menu, Tag } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppThunkDispatch, type RootState } from 'src/store'
import { fetchSideNav } from 'src/store/slice/navMenuSlice'
const { Sider } = Layout
const IMAGE_BASE_PATH = '';

interface PropTypes {
  trigger?: null
  collapsed: boolean
  sidenavWidth?: number
  collapseWidth?: number
}

const SideNav = ({trigger, collapsed, sidenavWidth, collapseWidth}: PropTypes): JSX.Element => {
  const dispatch = useDispatch<AppThunkDispatch>()
  const menuState = useSelector((state: RootState) => state.menu)
  const router = useRouter()

  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    const path = router.asPath.split('/')[1]
    setCurrentPath(path)
  })

  useEffect(() => {
    void dispatch(fetchSideNav())
  }, [dispatch])

  // console.log("menu==", menuState)

  const renderDynamicIcon = (icon: any): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const iconComp = (IconObj as any)[icon]
    return icon != null ? <Icon component={iconComp as React.ForwardRefExoticComponent<any>} /> : <></>
  }

  const logoObj = {
    url: collapsed ? "/LMC_icon.png" : "/LMC_logo.png",
    width: collapsed ? 50 : 240,
    height: collapsed ? 50 : 70,
    alt: collapsed ? 'Brand Image Icon' : 'Brand Logo'
  };

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
            rectHeight={110}
            circleR={130}
            viewBox="-50 0 1400 350"
          />
        </div>
      ) : (
        <Menu
          className="menu-height"
          defaultSelectedKeys={["dashboard"]}
          selectedKeys={[currentPath]}
        >
          {menuState.data.map((obj) => (
            <Menu.Item key={obj.key} icon={renderDynamicIcon(obj.icon)}>
              <NavLink href={obj.path}>
                <div className="d-flex justify-content-between align-items-center">
                  {obj.title}
                  {obj?.notification != null ? (
                    <Tag color="#B06AB3" className="m-0">
                      {obj?.notification}
                    </Tag>
                  ) : null}
                </div>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </Sider>
  );
}

export default SideNav
