import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Navigation from './navigation'

export default function Header({ className, ...props }: ComponentPropsWithoutRef<'header'>) {
  return (
    <>
      <Link href="#content" className="sr-only">
        Zum Inhalt springen
      </Link>

      <header className={cn('border-b border-neutral-100 py-8 bg-accent-50', className)} {...props}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-title text-3xl text-neutral-950">
            Gabriele Moll
          </Link>

          <Navigation
            items={[
              { href: '/', label: 'Startseite' },
              { href: '/atelier', label: 'Atelier' },
              { href: '/ueber-mich', label: 'Über mich' },
              { href: '/werke', label: 'Werke' },
              { href: '/ausstellungen', label: 'Ausstellungen' },
              { href: '/kurse', label: 'Kinderkurse' },
              { href: '/kontakt', label: 'Kontakt' },
            ]}
          />
        </div>
      </header>
    </>
  )
}
