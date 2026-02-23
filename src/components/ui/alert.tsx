import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Heading from './heading'
import Icon from './icon'

type Props = ComponentPropsWithoutRef<'div'> & {
  title: string
  variant: 'success' | 'error'
  children: ReactNode
}

export default function Alert({ children, className, title, variant, ...props }: Props) {
  return (
    <div role="alert" className={cn('flex flex-col p-4 bg-white border border-neutral-100', className)} aria-live="polite" {...props}>
      <Icon
        name={variant === 'success' ? 'check' : 'error'}
        className={cn('mb-2 size-10', {
          'text-red-300': variant === 'error',
          'text-emerald-200': variant === 'success',
        })}
      />

      <Heading level="h3" tag="h2" className="font-bold text-lg">
        {title}
      </Heading>
      <p>{children}</p>
    </div>
  )
}
