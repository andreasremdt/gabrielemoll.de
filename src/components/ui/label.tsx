import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export default function Label({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'label'>) {
  return (
    <label
      className={cn(
        'pointer-events-none absolute left-2 -translate-y-10 px-2 transition-transform duration-300 ease-in-out peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-10 top-6 font-sans',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}
