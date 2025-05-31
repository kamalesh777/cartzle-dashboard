import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { getCurrentPath } from '@/utils/commonFunctions'

interface NavLinkProps {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

export default function NavLink({
  href,
  exact = false,
  children,
  className = '',
  activeClassName = '',
}: NavLinkProps): JSX.Element {
  const path = usePathname()
  const pathname = getCurrentPath(path, true)
  const isActive = exact ? pathname === href : pathname?.startsWith(href)

  const combinedClassName = isActive ? `${className} ${activeClassName}` : className

  return (
    <Link href={href} passHref legacyBehavior>
      <a {...{ href, className: combinedClassName }}>{children}</a>
    </Link>
  )
}
