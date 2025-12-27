import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'h1'> & {
  level: 'h1' | 'h2' | 'h3' | 'h4'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function Heading({ children, level, tag, className, ...props }: Props) {
  const Tag = tag

  return (
    <Tag
      className={cn(
        'leading-none text-balance',
        {
          '': level === 'h1',
          '': level === 'h2',
          '': level === 'h3',
          '': level === 'h4',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
