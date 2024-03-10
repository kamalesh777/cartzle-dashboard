/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Skeleton } from 'antd'
import React, { type JSXElementConstructor, type ReactElement } from 'react'
import ContentLoader from 'react-content-loader'

interface Props {
  length?: number
  size?: 'small' | 'large' | 'default' | undefined
  block?: boolean | undefined
  noStyle?: undefined
  type?: string
  shape?: 'default' | 'circle' | 'square' | 'round' | undefined
  active?: boolean | undefined
}

interface propsNew {
  length: number
}

export const SkeletonParagraph = ({
  length,
  size,
  block,
  noStyle,
  type,
  shape,
  active,
}: Props): ReactElement<unknown, string | JSXElementConstructor<unknown>> => {
  switch (type) {
    case 'IMAGE':
      return <Skeleton.Image />
    // case 'RECT':
    //   return (<ContentLoader viewBox={'-50 0 1400 250'} >
    //     <rect x={'25%'} y={100} rx="0" ry="0" width={250} height={250} />
    //   </ContentLoader>)
    case 'BUTTON':
      <Skeleton.Button active={active ?? true} size={size} shape={shape} block={block} /> //eslint-disable-line
      break
    default:
      return (
        <div className={noStyle ?? 'my-3'}>
          {Array.from(Array(length).keys()).map((item, index) => (
            <div className={noStyle ?? 'my-3'} key={index}>
              <Skeleton.Input active={active ?? true} size={size} block={block} />
            </div>
          ))}
        </div>
      )
  }

  return (
    <div className={noStyle ?? 'my-3'}>
      {Array.from(Array(length).keys()).map((item, index) => (
        <div className={noStyle ?? 'my-3'} key={index}>
          <Skeleton.Input active={true} size={size} block={block} />
        </div>
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const SkeletonDefault = ({ length, ...props }: propsNew) => {
  return (
    <div className="my-3">
      {Array.from(Array(length).keys()).map((item, index) => (
        <Skeleton active {...props} key={index} />
      ))}
    </div>
  )
}

interface circleRectProps {
  rowCounts?: string | number
  rectHeight?: string | number
  viewBox?: string | undefined
  circleCx?: string | number
  circleCy?: string | number
  circleR?: string | number
  rectX?: string | number
  rectY?: string | number
  rectWidth?: string | number
}

interface tableProps {
  columnWidth: number[]
  rowHeight?: number
  rowCounts?: number
}

export const CircleRect = ({
  rowCounts,
  viewBox,
  circleCx,
  circleCy,
  circleR,
  rectX,
  rectY,
  rectHeight,
  rectWidth,
}: circleRectProps): JSX.Element => {
  const rows = rowCounts ?? 5
  const CirCx = circleCx ?? 150
  const CirCy = circleCy ?? 150
  const CirR = circleR ?? 120
  const RecX = rectX ?? '25%'
  const RecY = rectY ?? 100
  const Rectheight = rectHeight ?? 50
  const RectWidth = rectWidth ?? '65%'
  const newViewBox = viewBox ?? '-50 0 1400 250'

  return (
    <div className="mb-2">
      {Array.from(Array(rows).keys()).map((_, i) => (
        <ContentLoader viewBox={newViewBox} key={i}>
          {Array.from(Array(rows).keys())?.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <circle cx={CirCx} cy={CirCy} r={CirR} />
                <rect x={RecX} y={RecY} rx="0" ry="0" width={RectWidth} height={Rectheight} />
              </React.Fragment>
            )
          })}
        </ContentLoader>
      ))}
    </div>
  )
}

export const TableContentLoaderWithProps = ({ columnWidth, rowCounts, rowHeight }: tableProps, props: object): JSX.Element => {
  const rows = rowCounts ?? 5
  const height = rowHeight ?? 50
  let spaceValue = 0
  const spaceArray = columnWidth?.map(item => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    spaceValue += item - 0.3
    return spaceValue - item
  })

  return (
    <div className="mb-2" {...props}>
      {Array.from(Array(rows).keys()).map((_, i) => (
        <ContentLoader viewBox={`0 0 1500 ${height}`} key={i}>
          {columnWidth?.map((column, index) => {
            return (
              <React.Fragment key={index}>
                <rect
                  x={`${spaceArray[index] + index}%`}
                  y={height > 80 ? 30 : 20}
                  rx="4"
                  ry="4"
                  width={`${column - 1}%`}
                  height={height}
                />
              </React.Fragment>
            )
          })}
        </ContentLoader>
      ))}
    </div>
  )
}

interface RectShapeProps {
  rowCounts?: number
  rectX?: string | number
  rectY?: string | number
  canvasWidth?: number
  canvasHeight?: number
  viewBox?: string
  width: string | number
  height: string | number
}

export const RectShape = ({
  rowCounts,
  rectX,
  rectY,
  canvasWidth,
  canvasHeight,
  viewBox,
  width,
  height,
}: RectShapeProps): JSX.Element => {
  const rows = rowCounts ?? 1
  const x = rectX ?? 10
  const y = rectY ?? 10
  const canvWidth = canvasWidth ?? 1500
  const canvHeight = canvasHeight ?? 120
  const canvBox = viewBox ?? '0 0 1500 120'

  return (
    <>
      {Array.from(Array(rows).keys()).map((_, i) => (
        <ContentLoader
          key={i}
          speed={4}
          width={canvWidth}
          height={canvHeight}
          viewBox={canvBox}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x={x} y={y} rx="0" ry="0" width={width} height={height} />
        </ContentLoader>
      ))}
    </>
  )
}

interface UsageShapeProps {
  rowCounts?: number
  usageX?: string | number
  usageY?: string | number
  canvasWidth?: number
  canvasHeight?: number
  viewBox?: string
  width?: string | number
  height?: string | number
}

export const UsageShape = ({ rowCounts, canvasWidth, canvasHeight, viewBox }: UsageShapeProps): JSX.Element => {
  const rows = rowCounts ?? 1
  const canvWidth = canvasWidth ?? 500
  const canvHeight = canvasHeight ?? 160
  const canvBox = viewBox ?? '0 0 500 160'

  return (
    <>
      {Array.from(Array(rows).keys()).map((_, i) => (
        <ContentLoader
          key={i}
          speed={4}
          width={canvWidth}
          height={canvHeight}
          viewBox={canvBox}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="12" y="14" rx="0" ry="0" width="110" height="30" />
          <rect x="410" y="14" rx="0" ry="0" width="60" height="30" />
          <rect x="12" y="60" rx="0" ry="0" width="110" height="15" />
          <rect x="430" y="60" rx="0" ry="0" width="40" height="15" />
          <rect x="12" y="90" rx="0" ry="0" width="460" height="15" />
          <rect x="12" y="116" rx="0" ry="0" width="110" height="15" />
          <rect x="430" y="116" rx="0" ry="0" width="40" height="15" />
          <rect x="12" y="146" rx="0" ry="0" width="460" height="15" />
        </ContentLoader>
      ))}
    </>
  )
}

interface CancelShapeProps {
  rowCounts?: number
  usageX?: string | number
  usageY?: string | number
  canvasWidth?: number
  canvasHeight?: number
  viewBox?: string
  width: string | number
  height: string | number
}

export const CancelShape = ({ canvasWidth, canvasHeight, viewBox }: CancelShapeProps): JSX.Element => {
  const canvWidth = canvasWidth ?? 650
  const canvHeight = canvasHeight ?? 320
  const canvBox = viewBox ?? '0 0 650 320'

  return (
    <>
      <ContentLoader
        speed={4}
        width={canvWidth}
        height={canvHeight}
        viewBox={canvBox}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="231" y="77" rx="0" ry="0" width="110" height="15" />
        <rect x="211" y="108" rx="0" ry="0" width="150" height="9" />
        <rect x="84" y="144" rx="0" ry="0" width="400" height="10" />
        <circle cx="286" cy="34" r="25" />
        <rect x="98" y="163" rx="0" ry="0" width="370" height="10" />
        <rect x="134" y="185" rx="0" ry="0" width="300" height="10" />
        <rect x="85" y="217" rx="0" ry="0" width="400" height="10" />
        <rect x="137" y="242" rx="0" ry="0" width="300" height="10" />
        <rect x="231" y="284" rx="0" ry="0" width="110" height="30" />
      </ContentLoader>
    </>
  )
}

interface CancelShapeProps {
  rowCounts?: number
  usageX?: string | number
  usageY?: string | number
  canvasWidth?: number
  canvasHeight?: number
  viewBox?: string
  width: string | number
  height: string | number
}

export const CancelFormShape = ({ canvasWidth, canvasHeight, viewBox }: CancelShapeProps): JSX.Element => {
  const canvWidth = canvasWidth ?? 650
  const canvHeight = canvasHeight ?? 400
  const canvBox = viewBox ?? '80 20 650 400'

  return (
    <>
      <ContentLoader
        speed={4}
        width={canvWidth}
        height={canvHeight}
        viewBox={canvBox}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="-20" y="51" rx="0" ry="0" width="550" height="10" />
        <rect x="-20" y="71" rx="0" ry="0" width="350" height="10" />
        <rect x="-20" y="115" rx="0" ry="0" width="400" height="10" />
        <rect x="-20" y="134" rx="0" ry="0" width="350" height="10" />
        <rect x="-20" y="178" rx="0" ry="0" width="200" height="10" />
        <rect x="-20" y="204" rx="0" ry="0" width="550" height="30" />
        <rect x="-20" y="257" rx="0" ry="0" width="200" height="10" />
        <rect x="-20" y="277" rx="0" ry="0" width="550" height="30" />
        <rect x="330" y="360" rx="0" ry="0" width="200" height="30" />
      </ContentLoader>
    </>
  )
}

export const AppCardShape = ({ viewBox }: CancelShapeProps): JSX.Element => {
  // const canvWidth = canvasWidth ?? 430
  // const canvHeight = canvasHeight ?? 200
  const canvBox = viewBox ?? '0 0 430 200'

  return (
    <>
      <ContentLoader
        speed={2}
        // width={canvWidth}
        // height={canvHeight}
        viewBox={canvBox}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        {/* <rect x="4" y="8" rx="3" ry="3" width="7" height="180" /> */}
        {/* <rect x="5" y="180" rx="3" ry="3" width="330" height="8" /> */}
        {/* <rect x="330" y="9" rx="3" ry="3" width="6" height="180" /> */}
        <rect x="20" y="26" rx="16" ry="16" width="105" height="32" />
        <rect x="20" y="82" rx="3" ry="3" width="200" height="20" />
        <rect x="20" y="122" rx="3" ry="3" width="380" height="14" />
        <rect x="20" y="144" rx="3" ry="3" width="380" height="14" />
        <rect x="20" y="166" rx="3" ry="3" width="380" height="14" />
        <rect x="330" y="31" rx="3" ry="3" width="62" height="15" />
        <rect x="5" y="0" rx="3" ry="3" width="400" height="6" />
      </ContentLoader>
    </>
  )
}
