'use client'
import React from 'react'

import { Row, Card, Col } from 'antd'
import { useDispatch } from 'react-redux'

import { ButtonWrapper } from '@/components/Wrapper'
import { applyColor } from '@/store/slice/themeSlice'
import { hexToRGBA } from '@/utils/commonFunctions'

const DemoOne = (): JSX.Element => {
  const dispatch = useDispatch()
  const colorArr = [
    {
      name: 'Scarlet',
      code: '#FF2600',
    },
    {
      name: '#00F7FF',
      code: 'Aqua',
    },
    {
      name: 'Lemon Lime',
      code: '#EEFF00',
    },
    {
      name: 'Chartreuse',
      code: '#88FF00',
    },
    {
      name: 'Robin egg blue',
      code: '#32C4C9',
    },
    {
      name: 'Aerospace orange',
      code: '#FF4D00',
    },
    {
      name: 'Spring green',
      code: '#00FF73',
    },
    {
      name: 'Electric indigo',
      code: '#5900FF',
    },
    {
      name: 'Phlox',
      code: '#E600FF',
    },
    {
      name: 'Persian rose',
      code: '#FF00AA',
    },
    {
      name: 'Cyclamen',
      code: '#FF639C',
    },
    {
      name: 'Screamin green',
      code: '#90FF7C',
    },
    {
      name: 'Mindaro',
      code: '#F4FF7C',
    },
    {
      name: 'Light red',
      code: '#FF7C7C',
    },
    {
      name: 'Maya blue',
      code: '#7CC2FF',
    },
    {
      name: 'Prussian blue',
      code: '#083358',
    },
  ]
  return (
    <Row gutter={16}>
      {colorArr?.map(color => (
        <Col md={6} key={color.code}>
          <Card style={{ backgroundColor: color.code }} className="mb-3 text-center">
            <h3>{color.name}</h3>
            <ButtonWrapper type="primary" onClick={() => dispatch(applyColor(hexToRGBA(color.code) as string))}>
              Click
            </ButtonWrapper>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default DemoOne
