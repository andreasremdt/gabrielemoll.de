import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'input'> & {
  error?: string
}

export default function Input({ className, type = 'text', id, error, ...props }: Props) {
  return (
    <input
      className={cn('', className)}
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  )
}
