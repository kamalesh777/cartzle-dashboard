import { Grid } from 'antd'

interface PropTypes {
  isMobileDevice: boolean
  tableScroll: { [key: string]: string | number }
  componentSize: 'large' | 'middle' | 'small'
}

const { useBreakpoint } = Grid

const useDevice = (): PropTypes => {
  const screens = useBreakpoint()

  return {
    isMobileDevice: !screens.md,
    tableScroll: { x: !screens.md ? 700 : '' },
    componentSize: !screens.md ? 'middle' : 'large',
  }
}

export default useDevice
