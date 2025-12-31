'use client'

import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import useMobileMenu from '@/nooks/use-mobile-menu'
import useFocusTrap from '@/nooks/use-focus-trap'
import Icon from '../ui/icon'
import Button from '../ui/button'

type Props = ComponentPropsWithoutRef<'nav'> & {
  title: string
  size?: 'sm' | 'base'
  items: {
    href: string
    label: string
  }[]
}

export default function Navigation({ items, title, size = 'base', className, ...props }: Props) {
  const {
    isMenuVisible,
    isHiddenFromScreenReaders,
    setIsMenuVisible,
    tabIndex,
    menuRef,
    toggleRef,
  } = useMobileMenu()
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isMenuVisible)
  const pathname = usePathname()

  return (
    <nav className={cn('font-sans', className)} {...props} ref={focusTrapRef}>
      <Button
        type="button"
        aria-label={isMenuVisible ? 'Hauptmenü schließen' : 'Hauptmenü öffnen'}
        aria-live="polite"
        aria-controls="menu"
        ref={toggleRef}
        aria-expanded={isMenuVisible}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        className="relative z-20 flex items-center gap-2 lg:hidden"
      >
        Menü <Icon name={isMenuVisible ? 'close' : 'menu'} className="size-5" />
      </Button>

      <ul
        className={cn(
          'gap-8 fixed lg:static inset-0 bg-accent-50 flex flex-col items-center justify-center lg:flex-row z-10 lg:opacity-100 lg:pointer-events-auto lg:bg-transparent',
          {
            'pointer-events-none opacity-0': !isMenuVisible,
          },
        )}
        ref={menuRef}
        aria-hidden={isHiddenFromScreenReaders ? 'true' : undefined}
        id="menu"
      >
        <h2 className="font-title text-3xl lg:hidden">{title}</h2>

        {items.map((item) => (
          <li key={item.href}>
            <Link
              className={cn('hover:text-accent-700 text-lg', {
                'text-accent-800': pathname === item.href,
                'lg:text-sm': size === 'sm',
                'lg:text-base': size === 'base',
              })}
              href={item.href}
              tabIndex={tabIndex}
              prefetch
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
