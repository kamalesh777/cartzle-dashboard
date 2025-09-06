import Link from 'next/link'

interface NavLinkProps {
  href: string
  exact?: boolean
  children: React.ReactNode
  className?: string
}

export default function NavLink({ href, className, children }: NavLinkProps): JSX.Element {
  console.log("===href", href)
  return (
    <Link href={href} className={className}>
      <>
       {children}
      </>
    </Link>
  )
}
