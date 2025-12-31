import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getMenus } from '@/lib/fetchers'
import Navigation from './navigation'

export default async function Header({ className, ...props }: ComponentPropsWithoutRef<'header'>) {
  const menus = await getMenus()
  return (
    <>
      <Link href="#content" className="sr-only">
        Zum Inhalt springen
      </Link>

      <header className={cn('border-b border-neutral-100 py-8 bg-accent-50', className)} {...props}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="font-title text-2xl sm:text-3xl text-neutral-950">
            Gabriele Moll
          </Link>

          <Navigation title="Hauptmenü" items={menus.mainMenu} />
        </div>
      </header>
    </>
  )
}
