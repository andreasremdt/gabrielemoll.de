import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getMenus } from '@/lib/fetchers'
import Navigation from './navigation'

export default async function Footer({ className, ...props }: ComponentPropsWithoutRef<'footer'>) {
  const menus = await getMenus()

  return (
    <footer
      className={cn('border-t border-neutral-100 font-sans py-8 text-sm bg-accent-50', className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <p className="order-2 md:order-1">
          &copy; {new Date().getFullYear()} Gabriele Moll. Alle Rechte vorbehalten.
          <br />
          Design & Entwicklung von{' '}
          <Link href="https://andreasremdt.com" className="text-accent-800 hover:text-accent-700">
            Softwareentwicklung Andreas Remdt
          </Link>
          .
        </p>

        <Navigation
          title="Fußmenü"
          size="sm"
          className="md:justify-self-end order-1 md:order-2"
          items={menus.footerMenu}
        />
      </div>
    </footer>
  )
}
