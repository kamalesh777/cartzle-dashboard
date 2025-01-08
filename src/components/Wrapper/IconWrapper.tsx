'use client'

import Icon, * as IconObj from '@ant-design/icons'

interface Proptypes {
  icon: string
  className?: string
  rotate?: number
  spin?: boolean
  style?: React.CSSProperties
  twoToneColor?: string
}

/**
 * Utility function to render a dynamic Ant Design icon.
 */
export const renderDynamicIcon = (iconName: string): JSX.Element => {
  // Dynamically access the icon component from IconObj
  const iconComp = (IconObj as any)[iconName]
  return iconName != null ? <Icon component={iconComp} /> : <></>
}

/**
 * Component wrapper for Ant Design icons, allowing full customization.
 */
const IconWrapper: React.FC<Proptypes> = ({ icon, ...restProps }): JSX.Element => {
  // Dynamically render the icon with additional props
  const iconComp = (IconObj as any)[icon]
  return icon != null ? <Icon component={iconComp} {...restProps} /> : <></>
}

export default IconWrapper
