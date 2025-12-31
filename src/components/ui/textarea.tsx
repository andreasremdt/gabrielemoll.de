import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithoutRef<'textarea'> & {
  error?: string
}

export default function Textarea({ className, id, error, ...props }: Props) {
  return (
    <textarea
      className={cn(
        'peer h-12 w-full border-l border-b border-neutral-100 bg-white px-4 text-neutral-600 outline-none font-sans text-sm min-h-28 hover:border-neutral-200 focus-visible:border-neutral-300 py-2',
        className,
      )}
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  )
}
