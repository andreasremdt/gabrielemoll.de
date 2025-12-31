import type { TextWithImageBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'
import Prose from './prose'
import TiltedImage from '../ui/tilted-image'

export default function ImageWithText({
  intro,
  title,
  content,
  image,
  imageIsLeft,
}: TextWithImageBlock) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle intro={intro} title={title} level={2} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-32 place-items-start">
          <TiltedImage
            image={image}
            width={350}
            height={500}
            figureProps={{ className: 'w-full ' }}
          />

          <div className="lg:col-span-2">
            <Prose content={content} blockType="richText" />
          </div>
        </div>
      </div>
    </section>
  )
}
