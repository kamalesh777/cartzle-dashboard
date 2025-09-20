'use client'
import React from 'react'

import { Collapse, Form, Row, Tabs } from 'antd'

import { PanelsTopLeft, Save, X } from 'lucide-react'

import { ButtonWrapper, CardWrapper, ColWrapper, SelectWrapper, SpaceWrapper } from '@/components/Wrapper'

// eslint-disable-next-line no-duplicate-imports
import FormWrapper from '@/components/Wrapper/FormWrapper'
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import LayoutCardComp from '../components/LayoutCard'
import { tabsArray } from '../static/data'
import { pagesArray } from '../static/layout-card'

const ThemeBuilder = (): JSX.Element => {
  const [form] = Form.useForm()
  return (
    <FormWrapper form={form} log>
      <Row>
        {/* panel for config layout */}
        <ColWrapper>
          {pagesArray.map((obj, idx) => (
            <Collapse
              key={idx}
              // collapsible="header"
              className="mb-2"
              expandIconPosition="end"
              defaultActiveKey={['home']}
              items={[
                {
                  key: obj.id,
                  label: (
                    <SpaceWrapper>
                      <PanelsTopLeft className="lucide-icon-1-3" />
                      <span className="fw-semibold">{obj.label}</span>
                    </SpaceWrapper>
                  ),
                  classNames: {
                    header: 'bg-white w-100 rounded-2',
                  },
                  children: <LayoutCardComp />,
                  extra: (
                    <SpaceWrapper size={8}>
                      <ButtonWrapper noStyle icon={<X className="error-color-on-hover" />} />
                      <ButtonWrapper noStyle icon={<Save className="primary-color" />} />
                    </SpaceWrapper>
                  ),
                },
              ]}
            />
          ))}
        </ColWrapper>

        {/* Page Builder */}
        <ColWrapper span={24}>
          <CardWrapper bottomBorderNone>
            <Tabs
              centered
              className="builder-tabs"
              defaultActiveKey="2"
              tabBarExtraContent={{
                left: (
                  <SelectWrapper
                    placeholder="Select Page"
                    placement="bottomLeft"
                    options={pagesArray.map(obj => ({ label: obj.label, value: obj.id }))}
                  />
                ),
                right: <ButtonWrapper type="primary">Save</ButtonWrapper>,
              }}
              items={tabsArray.map(obj => {
                return {
                  ...obj,
                  icon: <IconWrapper name={obj.icon as IconProps['name']} />,
                }
              })}
            />
          </CardWrapper>
        </ColWrapper>
      </Row>
    </FormWrapper>
  )
}

export default ThemeBuilder
