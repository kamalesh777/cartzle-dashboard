'use client'

import { Icon } from 'lucide-react'

import { DynamicIcon } from 'lucide-react/dynamic'

// eslint-disable-next-line no-duplicate-imports
import type { IconNode } from 'lucide-react'

// eslint-disable-next-line no-duplicate-imports
import type { dynamicIconImports } from 'lucide-react/dynamic'

interface Proptypes {
  icon: string
  className?: string
  rotate?: number
  spin?: boolean
  style?: React.CSSProperties
  twoToneColor?: string
}

/**
 * Utility function to render a dynamic icon.
 */
export const renderDynamicIcon = (iconName: keyof typeof dynamicIconImports): JSX.Element => {
  // Dynamically access the icon component from IconObj
  return iconName != null ? <DynamicIcon name={iconName} /> : <></>
}

/**
 * Component wrapper for Ant Design icons, allowing full customization.
 */
const IconWrapper: React.FC<Proptypes> = ({ icon, ...restProps }): JSX.Element => {
  // Dynamically render the icon with additional props
  const iconComp = renderDynamicIcon(icon as keyof typeof dynamicIconImports)
  return icon != null ? <Icon {...restProps} iconNode={iconComp as unknown as IconNode} /> : <></>
}

export default IconWrapper
