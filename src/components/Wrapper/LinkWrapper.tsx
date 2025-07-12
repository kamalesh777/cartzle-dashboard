'use client'

import Link from 'next/link'

// eslint-disable-next-line no-duplicate-imports
import type { LinkProps } from 'next/link'

import { PageLeaveConfirmMessage } from '@/constants/AppConstant'

interface PropTypes extends LinkProps {
  children: React.ReactNode
  isValueChanged?: boolean
  className?: string
  id?: string
}

export function LinkWrapper({ href, isValueChanged, children, className, id }: PropTypes): JSX.Element {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (isValueChanged) {
      const confirmLeave = window.confirm(PageLeaveConfirmMessage)
      if (!confirmLeave) {
        e.preventDefault()
      }
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className} id={id}>
      {children}
    </Link>
  )
}
