import type { SelectedWorkBlock } from '@/payload-types'
import ImageKitImage from '@/components/imagekit-image'
import PageTitle from '../ui/page-title'
import { formatDate } from '@/lib/utils'
import Button from '../ui/button'

export default function SelectedWork({ title, work }: SelectedWorkBlock) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle title={title} level={2} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-16">
          {work.map((entry) => {
            if (typeof entry === 'string') return null

            return (
              <figure key={entry.id}>
                <ImageKitImage
                  className="mb-4 shadow-xl"
                  image={entry.image}
                  width={400}
                  height={400}
                />
                <figcaption className="text-center">
                  <span className="font-title text-xl md:text-2xl block mb-2">{entry.title}</span>
                  <span className="block text-accent-800 font-sans text-sm lg:text-base">
                    {formatDate(entry.date)}
                  </span>
                </figcaption>
              </figure>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Button href="/werke">Entdecken Sie mehr &rarr;</Button>
        </div>
      </div>
    </section>
  )
}
