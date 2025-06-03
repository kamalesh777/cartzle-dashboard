import React from 'react'

import { cyan, generate, gold, lime, magenta, presetPalettes, purple, volcano } from '@ant-design/colors'
import { Col, ColorPicker, Divider, Row, theme, type ColorPickerProps } from 'antd'

type Presets = Required<ColorPickerProps>['presets'][number]

function genPresets(presets = presetPalettes): Presets[] {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors, key: label }))
}

const CustomColorPicker = (props: ColorPickerProps): JSX.Element => {
  const { token } = theme.useToken()

  const totalColorsArr = [volcano, gold, lime, cyan, purple, magenta]
  const colorsArr = totalColorsArr?.map(item => item.slice(2, 7)).flat()

  const presets = genPresets({
    'Primary Color': generate(token.colorPrimary).slice(2, 10),
    'Select Color': colorsArr,
  })

  const customPanelRender: ColorPickerProps['panelRender'] = (_, { components: { Picker, Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Col span={13}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: 'auto' }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  )

  return (
    <ColorPicker
      defaultValue={token.colorPrimary}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      {...props}
    />
  )
}

export default CustomColorPicker
