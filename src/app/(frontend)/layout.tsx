import type { ReactNode } from 'react'
import { PT_Serif, Playfair_Display, Poppins } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

type Props = {
  children: ReactNode
}

const ptSerif = PT_Serif({
  variable: '--font-pt-serif',
  subsets: ['latin'],
  weight: ['400'],
})

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair-display',
  subsets: ['latin'],
  weight: ['400'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata = {
  description: {
    default: 'Gabriele Moll',
  },
  title: {
    default: 'Gabriele Moll',
    template: '%s | Gabriele Moll',
  },
  authors: [{ name: 'Andreas Remdt', url: 'https://andreasremdt.com' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL),
}

export default function Layout({ children }: Props) {
  return (
    <html
      lang="de"
      className={cn(
        ptSerif.variable,
        playfairDisplay.variable,
        poppins.variable,
        'antialiased font-body text-neutral-900',
      )}
    >
      <body>
        <Header />
        <main id="content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
