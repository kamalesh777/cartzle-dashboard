import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

export function NavLink({ href, exact = false, children, className = '', activeClassName = '' }: NavLinkProps): JSX.Element {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  console.log('==pathname', pathname)
  const combinedClassName = isActive ? `${className} ${activeClassName}` : className

  return (
    <Link href={href} passHref legacyBehavior>
      <a {...{ href, className: combinedClassName }}>{children}</a>
    </Link>
  )
}
