'use client'

import { useState } from 'react'

import { Grid } from 'antd'

interface PropTypes {
  isLoading: boolean
  isMobileDevice: boolean
  tableScroll: { [key: string]: string | number }
  componentSize: 'large' | 'middle' | 'small'
}

const { useBreakpoint } = Grid

const useDevice = (): PropTypes => {
  const [isLoading, setIsLoading] = useState(true)
  const screens = useBreakpoint()

  setTimeout(() => {
    setIsLoading(false)
  }, 1000)

  return {
    isLoading,
    isMobileDevice: !screens.md,
    tableScroll: { x: !screens.md ? 'max-content' : '' },
    componentSize: !screens.md ? 'middle' : 'large',
  }
}

export default useDevice
