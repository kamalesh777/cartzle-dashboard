import React from 'react'

import { Tabs } from 'antd'

import { MenuIcon, Save } from 'lucide-react'

import type { IconProps } from '@/components/Wrapper/IconWrapper'

import { ButtonWrapper, IconWrapper, DropdownWrapper } from '@/components/Wrapper'

import BuilderConfig from './BuilderConfig'
import BuilderLayoutForm from './BuilderLayoutForm'
import BuilderPreview from './BuilderPreview'
import { tabsArray } from '../static/data'
import { pagesArray } from '../static/layout-card'

const LayoutBuilder = (): JSX.Element => {
  const renderChildren = (key: string): JSX.Element | null => {
    switch (key) {
      case 'builder':
        return <BuilderLayoutForm />
      case 'preview':
        return <BuilderPreview />
      case 'config':
        return <BuilderConfig />
      default:
        return null
    }
  }
  return (
    <Tabs
      centered
      className="builder-tabs"
      defaultActiveKey="2"
      tabBarExtraContent={{
        left: (
          <DropdownWrapper
            menu={{ items: pagesArray.map(obj => ({ label: obj.label, key: obj.id })) }}
            trigger={['click']}
            overlayStyle={{ minWidth: '180px' }}
          >
            <MenuIcon className="me-3 lucide-icon-1-3" />
          </DropdownWrapper>
        ),
        right: (
          <ButtonWrapper size="small" icon={<Save />} type="primary">
            Save
          </ButtonWrapper>
        ),
      }}
      items={tabsArray.map(obj => {
        return {
          ...obj,
          icon: <IconWrapper name={obj.icon as IconProps['name']} />,
          children: renderChildren(obj.key),
        }
      })}
    />
  )
}

export default LayoutBuilder
