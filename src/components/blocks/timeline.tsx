import type { ReactNode } from 'react'
import type { TimelineBlock } from '@/payload-types'
import TiltedImage from '../ui/tilted-image'
import { cn } from '@/lib/utils'
import PageTitle from '../ui/page-title'

function TimelineWrapper({
  intro,
  title,
  children,
}: {
  intro?: string | null
  title?: string | null
  children: ReactNode
}) {
  if (title) {
    return (
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <PageTitle intro={intro} title={title} level={2} />
          {children}
        </div>
      </section>
    )
  }

  return children
}

export default function Timeline({ items, type, intro, title }: TimelineBlock) {
  if (type === 'withoutImages') {
    return (
      <TimelineWrapper intro={intro} title={title}>
        <ul className="flex flex-col gap-16 relative md:after:h-full md:after:w-px md:after:bg-neutral-300 md:after:top-0 md:after:left-1/2 md:after:absolute">
          {items.map((item) => (
            <li className="md:flex" key={item.id}>
              <h3 className="md:text-right md:mr-16 flex-1 font-sans text-accent-800 text-xl relative md:after:absolute md:after:h-8 md:after:w-[5px] md:after:bg-neutral-300 md:after:top-0 md:after:-right-16">
                {item.year}
              </h3>
              <p className="flex-1 md:ml-16">{item.content}</p>
            </li>
          ))}
        </ul>
      </TimelineWrapper>
    )
  }

  return (
    <TimelineWrapper intro={intro} title={title}>
      <ul className="flex flex-col gap-16 col-span-3 relative after:h-full after:w-px after:bg-neutral-300 after:top-0 after:left-1/2 after:absolute">
        {items.map((item, index) => (
          <li
            className={cn('flex', {
              'flex-row-reverse': index % 2 === 0,
            })}
            key={item.id}
          >
            <h3
              className={cn(
                'mt-16 flex-1 font-sans text-accent-800 text-xl relative after:absolute after:h-8 after:w-[5px] after:bg-neutral-300 after:top-0',
                {
                  'ml-8 md:ml-16 after:-left-8 md:after:-left-16': index % 2 === 0,
                  'mr-8 md:mr-16 text-right after:-right-8 md:after:-right-16': index % 2 !== 0,
                },
              )}
            >
              {item.year}
            </h3>
            <div
              className={cn('flex-1', {
                'mr-8 md:mr-16': index % 2 === 0,
                'ml-8 md:ml-16': index % 2 !== 0,
              })}
            >
              {item.image ? (
                <TiltedImage
                  image={item.image}
                  width={250}
                  height={250}
                  figureProps={{ className: 'mb-8 w-auto' }}
                />
              ) : null}
              <p className="text-sm md:text-base">{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </TimelineWrapper>
  )
}
