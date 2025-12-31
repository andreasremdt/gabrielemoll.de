import type { TheStudioBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'
import Button from '../ui/button'

export default function TheStudio({ title, intro, content }: TheStudioBlock) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-5xl mx-auto px-4">
        <PageTitle title={title} level={2} />

        <div className="md:grid md:grid-cols-3 md:gap-16 ">
          <p className="text-accent-800 text-xl leading-normal mb-8 md:mb-0">{intro}</p>

          <div className="col-span-2 sm:columns-2 prose max-w-none">
            <p dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
          </div>
        </div>

        <div className="text-center mt-16">
          <Button href="/atelier">Mehr über das Atelier &rarr;</Button>
        </div>
      </div>
    </section>
  )
}
