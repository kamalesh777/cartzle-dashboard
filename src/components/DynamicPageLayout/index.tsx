'use client'

import React, { useEffect, useState } from 'react'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Anchor, Col, Menu, Row, Tooltip } from 'antd'
import { useRouter, usePathname } from 'next/navigation'

import { NavLink } from '@/components/Common'
import { ButtonWrapper } from '@/components/Wrapper'
import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'
import sidenavData from '@/constants/menuData'

import styles from './style.module.css'

interface pageMenuItems {
  key: string
  path?: string
  href?: string
  title?: string
  icon?: React.ReactNode
  breadcrumb?: boolean
  hasDivider?: boolean
  notification?: number
}

interface menuItems {
  label?: string
  key: string
  icon?: React.ReactNode
  path?: string
  title?: string
  href?: string
  breadcrumb?: boolean
  notification?: number
  pagemenu?: pageMenuItems[]
  children?: menuItems[]
}

interface propTypes {
  isScrollable?: boolean
  MainComp: JSX.Element | null
  ActionComp?: JSX.Element | null
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

  hideTitle = false,
  customTitle,
  goBackUrl,
}: propTypes): JSX.Element => {
  const pathname = usePathname()
  const router = useRouter()

  const firstPathKey = pathname.split('/')[1]
  const currentPathKey = pathname.split('/').at(-1)

  const [pageMenu, setPageMenu] = useState<pageMenuItems[]>([])
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    loadPageMenu(firstPathKey)
  }, [firstPathKey, pathname])

  const loadPageMenu = (mainKey: string): void => {
    const mainMenu = sidenavData.find(obj => obj.key === mainKey) as menuItems
    if (!mainMenu) return

    // First try to match a child route with current pathname
    const matchedChild = mainMenu.children?.find(child => pathname.startsWith(child.path ?? ''))

    if (matchedChild?.pagemenu?.length) {
      setPageMenu(matchedChild.pagemenu)
      setTitle(matchedChild.title ?? '')
    } else if (mainMenu.pagemenu?.length) {
      setPageMenu([...mainMenu.pagemenu, ...hasStaticPageMenuItem])
      setTitle(mainMenu.title ?? '')
    } else {
      setPageMenu([])
    }
  }

  const anchorItems = pageMenu.map(item => ({
    title: <div style={{ paddingBlock: '4px' }}>{item.title}</div>,
    key: item.key,
    href: item.href ?? `#${item.key}`,
  }))

  const linkedMenuItems = pageMenu.map(item => ({
    ...item,
    label: item.title,
  }))

  const goBackButton = goBackUrl ? (
    <Tooltip title="Go Back">
      <ButtonWrapper
        onClick={() => router.push(goBackUrl)}
        className="me-2"
        style={{ width: 40 }}
        icon={<ArrowLeftOutlined style={{ fontSize: '14px' }} />}
      />
    </Tooltip>
  ) : null

  const leftSideComponent = (
    <div className="settings-stepper title-row" style={isScrollable ? { position: 'fixed' } : {}}>
      <p className="page-title">
        {goBackButton}
        {!hideTitle ? customTitle || title : null}
      </p>
      {isScrollable ? (
        <Anchor affix={false} bounds={60} offsetTop={80} className="affix-menu mt-3" items={anchorItems} />
      ) : (
        <Menu className="mt-3 page-menu">
          {linkedMenuItems.map(item => (
            <Menu.Item key={item.key} className={item.path?.split('/').at(-1) === currentPathKey ? 'ant-menu-item-selected' : ''}>
              <NavLink href={item.path ?? '#'}>
                <div className="d-flex justify-content-between align-items-center">{item.label}</div>
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  )

  const rightSideComponent = <div className={styles['anchor-component']}>{MainComp}</div>

  const renderLayout = (): JSX.Element => (
    <div className="main-content">
      <Row gutter={COMMON_ROW_GUTTER}>
        {pageMenu.length > 0 ? (
          <>
            <Col span={5}>{leftSideComponent}</Col>
            <Col span={19}>
              {ActionComp}
              {rightSideComponent}
            </Col>
          </>
        ) : (
          <Col span={24}>
            <div className="title-row mb-24 d-flex justify-content-between">
              <span className="page-title">
                {goBackButton}
                {!hideTitle ? customTitle || title : null}
              </span>
              {ActionComp}
            </div>
            {rightSideComponent}
          </Col>
        )}
      </Row>
    </div>
  )

  return renderLayout()
}

export default DynamicPageLayout
