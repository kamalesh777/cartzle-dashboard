'use client'

import { Icon } from 'lucide-react'

import { DynamicIcon } from 'lucide-react/dynamic'

// eslint-disable-next-line no-duplicate-imports
import type { IconNode } from 'lucide-react'

// eslint-disable-next-line no-duplicate-imports
import type { dynamicIconImports } from 'lucide-react/dynamic'

export interface IconProps {
  name: keyof typeof dynamicIconImports
  size?: number
  className?: string
  style?: React.CSSProperties
  fill?: string
  strokeWidth?: number
}
/**
 * Utility function to render a dynamic icon.
 */
export const renderDynamicIcon = (iconObj: IconProps): JSX.Element => {
  // Dynamically access the icon component from IconObj
  return <DynamicIcon {...iconObj} />
}

/**
 * Component wrapper for Ant Design icons, allowing full customization.
 */
const IconWrapper: React.FC<IconProps> = (props): JSX.Element => {
  // Dynamically render the icon with additional props
  const iconComp = renderDynamicIcon(props)
  return <Icon {...props} iconNode={iconComp as unknown as IconNode} />
}

export default IconWrapper
