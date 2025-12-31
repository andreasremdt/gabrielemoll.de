import type { ComponentPropsWithoutRef, ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import ImageKitImage from '../imagekit-image'

type Props = ComponentProps<typeof ImageKitImage> & {
  figureProps?: ComponentPropsWithoutRef<'figure'>
}

export default function Image({ className, figureProps, image, ...props }: Props) {
  return (
    <figure
      {...figureProps}
      className={cn(
        'isolate relative max-w-max after:-z-10 md:after:inset-0 after:inset-4 after:bg-accent-100 after:-rotate-12 after:absolute',
        figureProps?.className,
      )}
    >
      <ImageKitImage
        image={image}
        width={400}
        height={500}
        className={cn('shadow-xl ', className)}
        {...props}
      />
    </figure>
  )
}
