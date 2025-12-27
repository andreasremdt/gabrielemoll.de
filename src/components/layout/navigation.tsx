'use client'

import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithoutRef<'nav'> & {
  items: {
    href: string
    label: string
  }[]
}

export default function Navigation({ items, className, ...props }: Props) {
  const pathname = usePathname()

  return (
    <nav className={cn('font-sans', className)} {...props}>
      <ul className="flex gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className={cn('hover:text-accent-700', pathname === item.href && 'text-accent-800')}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
