import React from 'react'

import Icon from '@ant-design/icons'

const MORE_VERTICAL_SVG = (): JSX.Element => (
  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      {' '}
      <g id="Menu / More_Vertical">
        {' '}
        <g id="Vector">
          {' '}
          <path
            d="M11 18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{' '}
          <path
            d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{' '}
          <path
            d="M11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />{' '}
        </g>{' '}
      </g>{' '}
    </g>
  </svg>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MoreVertical = (props: any): JSX.Element => {
  return <Icon component={MORE_VERTICAL_SVG} {...props} />
}

export default MoreVertical
