import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithoutRef<'h1'> & {
  intro?: string | null
  subtitle?: string | null
  title: string
  level?: 1 | 2
}

export default function PageTitle({ intro, title, subtitle, className, level = 1, ...props }: Props) {
  const Tag = level === 1 ? 'h1' : 'h2'

  return (
    <header className="lg:mb-40 mb-20 relative after:absolute after:h-12 lg:after:h-24 after:w-px after:bg-neutral-300 after:top-full after:left-1/2 lg:after:mt-8 after:mt-4">
      {intro ? (
        <p className="font-sans text-accent-800 text-base md:text-lg text-center">{intro}</p>
      ) : null}
      <Tag
        className={cn(
          'text-center text-balance font-title text-7xl',
          {
            'text-5xl md:text-6xl lg:text-7xl': level === 1,
            'text-4xl sm:text-5xl lg:text-6xl': level === 2,
          },
          className,
        )}
        {...props}
      >
        {title}
      </Tag>
      {subtitle ? <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4">{subtitle}</p> : null}
    </header>
  )
}
