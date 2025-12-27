import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type Props = ComponentPropsWithoutRef<'label'> & {
  optional?: boolean
}

export default function Label({ children, optional, className, ...props }: Props) {
  return (
    <label className={cn('', className)} {...props}>
      {children}

      {optional ? <span className="">optional</span> : null}
    </label>
  )
}
