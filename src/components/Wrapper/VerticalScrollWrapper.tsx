import React from 'react'

interface Props {
  children: React.ReactNode
  maxHeight?: number | string
  className?: string
  style?: React.CSSProperties
}
const VerticalScrollWrapper = (Props: Props): JSX.Element => {
  const { children, maxHeight, className, style } = Props
  return (
    <>
      <style jsx global>
        {`
          .max-h-${maxHeight} {
            max-height: ${maxHeight}px;
            scrollbar-width: thin;
            overflow-x: scroll;
            padding-bottom: 3px;
          }
          .vertical-scroll {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            gap: 10px;
          }
        `}
      </style>
      <div className={`vertical-scroll max-h-${maxHeight} ${className ?? ''}`} style={style}>
        {children}
      </div>
    </>
  )
}

export default VerticalScrollWrapper
