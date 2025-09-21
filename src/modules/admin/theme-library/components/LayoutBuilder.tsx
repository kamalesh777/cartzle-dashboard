import React from 'react'

import { Tabs } from 'antd'

import { Save } from 'lucide-react'

import type { IconProps } from '@/components/Wrapper/IconWrapper'

import { SelectWrapper, ButtonWrapper, IconWrapper } from '@/components/Wrapper'

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
          <SelectWrapper
            placeholder="Select Page"
            placement="bottomLeft"
            style={{ width: '180px' }}
            options={pagesArray.map(obj => ({ label: obj.label, value: obj.id }))}
          />
        ),
        right: (
          <ButtonWrapper icon={<Save />} type="primary">
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
