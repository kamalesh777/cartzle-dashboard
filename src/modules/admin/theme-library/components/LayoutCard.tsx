import React from 'react'

import { Collapse, Row, theme } from 'antd'

import { Check, CircleMinus, GripVertical } from 'lucide-react'
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuidv4 } from 'uuid'

import type { ComponentStateTypes, LayoutCardTypes } from '../types'
// eslint-disable-next-line no-duplicate-imports
import type { FormInstance } from 'antd'

import { ButtonWrapper, CardWrapper, ColWrapper, SpaceWrapper, TagWrapper } from '@/components/Wrapper'
import IconWrapper, { type IconProps } from '@/components/Wrapper/IconWrapper'

import { COMMON_ROW_GUTTER } from '@/constants/AppConstant'

import useDevice from '@/hook/useDevice'

import { layoutConfigArray } from '../static/layout-card'

interface PropTypes {
  page: string
  form: FormInstance
}

const LayoutCardComp = ({ page, form }: PropTypes): JSX.Element => {
  // theme color
  const { token } = theme.useToken()
  const { isMobileDevice } = useDevice()

  const [componentsState, setComponentsState] = React.useState<ComponentStateTypes[]>([])

  // component state handler
  const componentStateHandler = (item: LayoutCardTypes, type: string): void => {
    const { id: variant, label } = item
    setComponentsState([...componentsState, { id: uuidv4(), variant, label, page, type }])
  }

  // accept handler
  const acceptHandler = (): void => {
    form.setFieldsValue({ components: componentsState })
  }

  // render children function
  const renderChildren = (children: LayoutCardTypes[], type: string): JSX.Element => {
    return (
      <Row gutter={8}>
        {children?.map((item, index) => (
          <ColWrapper md={6} key={index}>
            <CardWrapper
              onClick={() => componentStateHandler(item, type)}
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
  // sortable part
  return (
    <Row gutter={COMMON_ROW_GUTTER}>
      <ColWrapper md={10} order={isMobileDevice ? 2 : 1}>
        {/* sortable start */}
        <ReactSortable list={componentsState} setList={setComponentsState}>
          {componentsState.map(item => (
            <CardWrapper
              key={item.id}
              size="small"
              className="mb-2 hover-card-border bg-gray-100 show cursor-move"
              styles={{ body: { padding: '8px' } }}
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

        {/* sortable end */}
        {componentsState.length > 0 && (
          <div className="mt-5">
            <SpaceWrapper size={12} className="component-footer">
              <ButtonWrapper size="small">Cancel</ButtonWrapper>
              <ButtonWrapper type="primary" size="small" onClick={acceptHandler}>
                <Check />
                Accept
              </ButtonWrapper>
            </SpaceWrapper>
          </div>
        )}
      </ColWrapper>
      <ColWrapper md={14} order={isMobileDevice ? 1 : 2}>
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
                children: renderChildren(obj?.children || [], obj?.id),
              },
            ]}
          />
        ))}
      </ColWrapper>
    </Row>
  )
}

export default LayoutCardComp
