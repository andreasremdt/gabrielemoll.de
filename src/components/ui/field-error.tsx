import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithoutRef<'p'> & {
  error?: string
}

export default function FieldError({ id, error, className, ...props }: Props) {
  if (!error) return null

  return (
    <p className={cn('', className)} id={`${id}-error`} aria-live="assertive" {...props}>
      {error}
    </p>
  )
}
