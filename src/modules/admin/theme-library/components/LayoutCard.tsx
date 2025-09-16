import React from 'react'

import { Collapse, Row, theme } from 'antd'

import { CircleMinus, GripVertical } from 'lucide-react'
import { ReactSortable } from 'react-sortablejs'

import type { LayoutCardTypes } from '../types'

import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper, TagWrapper } from '@/components/Wrapper'
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import { layoutConfigArray } from '../static/layout-card'

const LayoutCardComp = (): JSX.Element => {
  // theme color
  const { token } = theme.useToken()

  const [componentsState, setComponentsState] = React.useState<LayoutCardTypes[]>([])

  // render children function
  const renderChildren = (children: LayoutCardTypes[]): JSX.Element => {
    return (
      <Row gutter={8}>
        {children?.map((item, index) => (
          <ColWrapper span={6} key={index}>
            <CardWrapper
              onClick={() =>
                setComponentsState([
                  ...componentsState,
                  // id need unique
                  { ...item, id: `${item.id}=${componentsState?.length}` },
                ])
              }
              key={item.id}
              size="small"
              className="mb-2 cursor-pointer hover-card-border show"
            >
              <div className="w-100 d-flex justify-content-between align-items-center">
                <p>{item.label}</p>
                <IconWrapper className="primary-color on-hover" name={'plus-circle' as IconProps['name']} />
              </div>
            </CardWrapper>
          </ColWrapper>
        ))}
      </Row>
    )
  }
  return (
    <Row gutter={COMMON_ROW_GUTTER}>
      <ColWrapper span={10}>
        <ReactSortable list={componentsState} setList={setComponentsState}>
          {componentsState.map(item => (
            <CardWrapper
              key={item.id}
              size="small"
              className="mb-2 hover-card-border bg-gray-100 show cursor-move"
            >
              <div className="w-100 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <GripVertical className="on-hover lucide-icon-1-3" style={{ marginLeft: '-5px' }} />
                  <p>{item.label}</p>
                </div>
                <ButtonWrapper
                  type="link"
                  icon={<CircleMinus />}
                  onClick={() => setComponentsState(componentsState.filter(obj => obj.id !== item.id))}
                  className="error-color h-auto"
                />
              </div>
            </CardWrapper>
          ))}
        </ReactSortable>
      </ColWrapper>
      <ColWrapper span={14}>
        {layoutConfigArray.map((obj, idx) => (
          <Collapse
            key={idx}
            expandIconPosition="end"
            className="mb-2"
            bordered={false}
            items={[
              {
                key: obj.id,
                label: (
                  <div className="d-flex justify-content-between">
                    <SpaceWrapper>
                      <IconWrapper name={obj.icon as IconProps['name']} />
                      <span className="fw-semibold">{obj.label}</span>
                    </SpaceWrapper>
                    {obj?.children && obj?.children?.length > 0 && (
                      <TagWrapper color={token.colorPrimary}>{obj.children?.length} Variants</TagWrapper>
                    )}
                  </div>
                ),
                children: renderChildren(obj?.children || []),
              },
            ]}
          />
        ))}
      </ColWrapper>
    </Row>
  )
}

export default LayoutCardComp
