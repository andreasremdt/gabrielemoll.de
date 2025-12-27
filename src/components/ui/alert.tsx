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
    <div role="alert" className={cn('', className)} aria-live="polite" {...props}>
      <Icon
        name={variant === 'success' ? 'check' : 'error'}
        className={cn('', {
          '': variant === 'error',
          '': variant === 'success',
        })}
      />

      <Heading level="h3" tag="h2">
        {title}
      </Heading>
      <p>{children}</p>
    </div>
  )
}
