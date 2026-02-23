import type { ComponentPropsWithoutRef } from 'react'
import type { Media } from '@/payload-types'
import { cn, formatDate } from '@/lib/utils'
import TiltedImage from './tilted-image'

type Props = ComponentPropsWithoutRef<'article'> & {
  date: string
  title: string
  description?: string | null
  image: string | Media
  reverse?: boolean
}

export default function Exhibition({
  date,
  title,
  description,
  className,
  image,
  reverse = false,
  ...props
}: Props) {
  return (
    <article
      className={cn('flex flex-col md:flex-row gap-8 md:gap-16 md:items-center', className, {
        'md:flex-row-reverse': reverse,
      })}
      {...props}
    >
      <div className="shrink-0 md:w-1/3">
        <TiltedImage
          image={image}
          width={350}
          height={350}
          className="shadow-xl size-[200px] md:size-auto"
        />
      </div>
      <div className="md:w-2/3">
        <time
          dateTime={date}
          className="font-sans text-accent-800 relative md:after:w-28 md:after:h-px md:after:bg-accent-800 md:after:absolute md:after:left-full md:after:top-1/2 md:after:ml-8 md:mb-4 block w-max"
        >
          {formatDate(date)}
        </time>

        <h2 className="font-title text-3xl md:text-4xl md:mb-8 mb-4">{title}</h2>

        {description ? (
          <p
            className="prose max-w-none md:prose-lg"
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }}
          />
        ) : null}
      </div>
    </article>
  )
}
