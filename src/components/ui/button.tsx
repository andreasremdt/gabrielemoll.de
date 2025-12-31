import type { ComponentPropsWithoutRef, ReactNode, RefObject } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type BaseProps = {
  variant?: 'primary' | 'secondary'
  children: ReactNode
  className?: string
  ref?: RefObject<HTMLButtonElement | null>
}

type ButtonProps = BaseProps &
  ComponentPropsWithoutRef<'button'> & {
    href?: never
  }

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
    href: string
    type?: never
  }

type Props = ButtonProps | LinkProps

export default function Button({
  children,
  className,
  type = 'button',
  variant = 'primary',
  href,
  ref,
  ...props
}: Props) {
  const baseClasses = cn(
    'font-sans font-medium uppercase cursor-pointer',
    {
      'text-accent-800 hover:text-accent-700': variant === 'primary',
      '': variant === 'secondary',
    },
    className,
  )

  if (href) {
    return (
      <Link
        prefetch={href ? href.startsWith('/') : undefined}
        href={href}
        className={baseClasses}
        {...(props as Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>)}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      className={baseClasses}
      type={type}
      ref={ref}
      {...(props as ComponentPropsWithoutRef<'button'>)}
    >
      {children}
    </button>
  )
}
