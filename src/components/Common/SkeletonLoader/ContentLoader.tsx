import React from 'react'

import ContentLoader from 'react-content-loader'

interface PropTypes {
  columnWidth: Array<string | number>
  rowCounts: number
  rowHeight?: number
  className?: string
  radius?: number
  verticalGap?: number
}

export function TableContentLoaderWithProps(
  { columnWidth, rowCounts, rowHeight = 60, className, radius = 8, verticalGap = 25 }: PropTypes,
  props: React.PropsWithChildren,
): JSX.Element {
  const rows = rowCounts || 5
  const height = rowCounts === 1 ? 120 : rowHeight
  let spaceValue = 0

  /* it will store an array with the sum of the columnWidth array elements one by one like
    const arr = [1, 2, 3, 6];
    then the array will be [0, 3, 6, 12]
    */
  const spaceArray = columnWidth.map((item, idx) => {
    if (idx !== 0) {
      spaceValue += Number(columnWidth[idx - 1]) + 2
    }
    return spaceValue
  })

  return (
    <div className={className || 'mb-2'} {...props}>
      {Array.from(Array(rows).keys()).map((row, i) => (
        <ContentLoader viewBox={`0 0 1500 ${height}`} key={i} backgroundColor={'#E1E1E1'}>
          {columnWidth?.map((column, index) => (
            <React.Fragment key={index}>
              <rect
                x={typeof column === 'string' ? `${Number(column)}%` : `${spaceArray[index]}%`}
                y={height > 80 ? verticalGap || 30 : verticalGap}
                rx={radius}
                ry={radius}
                width={typeof column === 'string' ? `0%` : `${column}%`}
                height={height - verticalGap}
              />
            </React.Fragment>
          ))}
        </ContentLoader>
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
