import React from 'react'

import { Tabs } from 'antd'

import { MenuIcon, Save } from 'lucide-react'

import type { IconProps } from '@/components/Wrapper/IconWrapper'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import { ButtonWrapper, IconWrapper, DropdownWrapper, SelectWrapper } from '@/components/Wrapper'

import useDevice from '@/hook/useDevice'

import BuilderConfig from './BuilderConfig'
import BuilderLayoutForm from './BuilderLayoutForm'
import BuilderPreview from './BuilderPreview'
import { tabsArray } from '../static/data'
import { pagesArray } from '../static/layout-card'

interface PropTypes {
  form: FormInstance
}

const LayoutBuilder = ({ form }: PropTypes): JSX.Element => {
  const { isMobileDevice } = useDevice()
  const renderChildren = (key: string): JSX.Element | null => {
    switch (key) {
      case 'builder':
        return <BuilderLayoutForm form={form} />
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
        left: isMobileDevice ? (
          <DropdownWrapper
            menu={{ items: pagesArray.map(obj => ({ label: obj.label, key: obj.id })) }}
            trigger={['click']}
            overlayStyle={{ minWidth: '180px' }}
          >
            <MenuIcon className="me-3 lucide-icon-1-3" />
          </DropdownWrapper>
        ) : (
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
