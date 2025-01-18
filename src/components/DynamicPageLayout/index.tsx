import React, { useEffect, useState } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'

import { Anchor, Button, Col, Menu, Row, Tag } from 'antd'

import { useRouter, usePathname } from 'next/navigation'

import { NavLink } from '@/components/Common/NavLink'
import sidenavData from '@/constants/menuData.json'

import styles from './style.module.css'
interface pageMenuItems {
  // label: string
  key: string
  path?: string
  breadcrumb?: boolean
  title?: string
  herf?: string
  hasDivider?: boolean
  notification?: number
}
interface menuItems {
  label?: string
  key: string
  icon?: React.ReactNode
  path?: string
  href?: string
  title?: string
  breadcrumb?: boolean
  notification?: number
  submenu?: pageMenuItems[]
}

interface propTypes {
  isScrollable?: boolean
  MainComp: JSX.Element | null
  ActionComp?: JSX.Element | null
  menuCounter?: number
  hasStaticPageMenuItem?: menuItems[]
  hideTitle?: boolean
  customTitle?: string
  goBackUrl?: string
}

const DynamicPageLayout = ({
  hasStaticPageMenuItem = [],
  isScrollable = false,
  MainComp,
  ActionComp,
  menuCounter,
  hideTitle = false,
  customTitle,
  goBackUrl,
}: propTypes): JSX.Element => {
  const pathname = usePathname()
  const router = useRouter()

  const firstIndexValue = pathname.split('/')[1]
  // eslint-disable-next-line no-unused-vars
  const currentPath = pathname.split('/').at(-1)

  const [pageMenu, setPageMenu] = useState<menuItems[]>([])
  const [title, setTitle] = useState<string | undefined>('')

  useEffect(() => {
    getRouteSpecificMenu(firstIndexValue)
  }, [firstIndexValue])

  const getRouteSpecificMenu = (routeName: string): void => {
    const menuObj = sidenavData.find(obj => obj.key === routeName) as menuItems
    // eslint-disable-next-line no-prototype-builtins
    if (menuObj?.submenu != null) {
      setPageMenu([...menuObj.submenu, ...hasStaticPageMenuItem])
    }
    // set the title of found object
    menuObj != null && setTitle(menuObj.title)
  }

  const goBackButton =
    goBackUrl != null ? (
      <Button
        title="Go Back"
        onClick={() => router.push(goBackUrl)}
        className="me-2"
        style={{ width: '40px' }}
        icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
      />
    ) : null

  // anchor menu for scrollable card
  const anchorMenus = pageMenu?.map(obj => ({
    title: obj.title,
    key: obj.key,
    href: `#${obj.key}`,
  }))
  // linked menu for redirect to specfic page
  const linkedMenus = pageMenu?.map(obj => ({
    ...obj,
    label: obj.title,
  }))

  // left side component of main page layout
  const leftSideComponent = (
    <>
      {isScrollable ? (
        <div style={{ position: 'fixed' }} className="settings-stepper title-row">
          {!hideTitle ? (
            <h1 className="page-title">
              {goBackButton}
              {customTitle || title}
            </h1>
          ) : null}
          <Anchor affix={false} className="affix-menu" items={anchorMenus} />
        </div>
      ) : (
        <div className="settings-stepper title-row">
          {!hideTitle ? (
            <h1 className="page-title">
              {goBackButton}
              {customTitle || title}
            </h1>
          ) : null}
          <Menu className="affix-menu">
            {linkedMenus?.map(obj => (
              <Menu.Item key={obj.key} className={obj.path?.split('/').at(-1) === currentPath ? 'ant-menu-item-selected' : ''}>
                <NavLink href={obj.path as string}>
                  <div className="d-flex justify-content-between align-items-center">
                    {obj.label}
                    {menuCounter != null ? (
                      <Tag color="#B06AB3" className="m-0">
                        {menuCounter}
                      </Tag>
                    ) : null}
                  </div>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      )}
    </>
  )

  // right side component of main page layout
  const rightSideComponent = <div className={styles['anchor-component']}>{MainComp}</div>

  const renderComponent = (hasMenu: boolean): JSX.Element => {
    return (
      <div className="main-content">
        <Row gutter={14}>
          {hasMenu ? (
            <>
              <Col span={4}>{leftSideComponent}</Col>
              <Col span={20}>
                {ActionComp}
                {rightSideComponent}
              </Col>
            </>
          ) : (
            // eslint-disable-next-line indent
            <Col span={24}>
              {!hideTitle ? (
                <div className="title-row mb-24 d-flex justify-content-between">
                  <span className="page-title">
                    {goBackButton}
                    {customTitle || title}
                  </span>
                  {ActionComp}
                </div>
              ) : null}
              {rightSideComponent}
            </Col>
            // eslint-disable-next-line indent
          )}
        </Row>
      </div>
    )
  }

  // will return true or false behalf on menu item array
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const menuPresent = pageMenu.length > 0

  return renderComponent(menuPresent)
}

export default DynamicPageLayout
