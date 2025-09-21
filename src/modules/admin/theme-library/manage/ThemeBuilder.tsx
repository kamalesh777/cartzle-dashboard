'use client'
import React from 'react'

import { Collapse, Form, Row } from 'antd'

import { PanelsTopLeft } from 'lucide-react'

import { CardWrapper, ColWrapper, SpaceWrapper } from '@/components/Wrapper'

// eslint-disable-next-line no-duplicate-imports
import FormWrapper from '@/components/Wrapper/FormWrapper'

import LayoutBuilder from '../components/LayoutBuilder'
import LayoutCardComp from '../components/LayoutCard'

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
                  children: <LayoutCardComp page={obj.id} />,
                },
              ]}
            />
          ))}
        </ColWrapper>

        {/* Page Builder */}
        <ColWrapper span={24}>
          <CardWrapper bottomBorderNone>
            <LayoutBuilder />
          </CardWrapper>
        </ColWrapper>
      </Row>
    </FormWrapper>
  )
}

export default ThemeBuilder
