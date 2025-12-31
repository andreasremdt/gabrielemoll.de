import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithoutRef<'input'> & {
  error?: string
}

export default function Input({ className, type = 'text', id, error, ...props }: Props) {
  return (
    <input
      className={cn(
        'peer h-12 w-full border-l border-b border-neutral-100 bg-white px-4 text-neutral-600 outline-none font-sans text-sm hover:border-neutral-200 focus-visible:border-neutral-300',
        { 'border-red-400 hover:border-red-500 focus-visible:border-red-500': error },
        className,
      )}
      id={id}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      {...props}
    />
  )
}
