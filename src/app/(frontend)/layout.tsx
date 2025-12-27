import type { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
}

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata = {
  description: {
    default: 'Webseite description',
  },
  title: {
    default: 'Website template',
    template: '%s | Website template',
  },
  authors: [{ name: 'Andreas Remdt', url: 'https://andreasremdt.com' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL),
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en" className={cn(roboto.variable, 'antialiased')}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
