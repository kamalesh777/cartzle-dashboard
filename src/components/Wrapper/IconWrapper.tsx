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
  iconNode?: IconNode
}
/**
 * Utility function to render a dynamic icon.
 */
export const renderDynamicIcon = (iconObj: IconProps): JSX.Element => {
  // Dynamically access the icon component from IconObj
  return <DynamicIcon {...iconObj} />
}


/**
 * IconWrapper handles both dynamic (by name) and static (by iconNode) icons.
 */
const IconWrapper: React.FC<IconProps> = ({
  name,
  iconNode,
  ...rest
}): JSX.Element | null => {
  if (name) {
    // Dynamic usage
    return <DynamicIcon name={name} {...rest} />
  }

  if (iconNode) {
    // Static usage
    return <Icon iconNode={iconNode} {...rest} />
  }

  return null
}

export default IconWrapper
