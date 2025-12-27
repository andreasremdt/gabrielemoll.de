import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'textarea'> & {
  error?: string
}

export default function Textarea({ className, id, error, ...props }: Props) {
  return (
    <textarea
      className={cn('', className)}
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  )
}
