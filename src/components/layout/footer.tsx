import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Navigation from './navigation'

export default function Footer({ className, ...props }: ComponentPropsWithoutRef<'footer'>) {
  return (
    <footer
      className={cn('border-t border-neutral-100 font-sans py-8 text-sm bg-accent-50', className)}
      {...props}
    >
      <div className="container mx-auto px-4 flex justify-between gap-8">
        <p>
          &copy; {new Date().getFullYear()} Gabriele Moll. Alle Rechte vorbehalten.
          <br />
          Design & Entwicklung von{' '}
          <Link href="https://andreasremdt.com" className="text-accent-800 hover:text-accent-700">
            Softwareentwicklung Andreas Remdt
          </Link>
          .
        </p>

        <Navigation
          items={[
            { href: '/datenschutz', label: 'Datenschutz' },
            { href: '/impressum', label: 'Impressum' },
            { href: '/kontakt', label: 'Kontakt' },
            { href: '/links', label: 'Links' },
          ]}
        />
      </div>
    </footer>
  )
}
