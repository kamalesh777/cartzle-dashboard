import Link from 'next/link'

interface NavLinkProps {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
}

export default function NavLink({ href, className, children }: NavLinkProps): JSX.Element {
  return (
    <Link href={href} passHref legacyBehavior>
      <a {...{ href, className }}>{children}</a>
    </Link>
  )
}
