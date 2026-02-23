import type { GalleryBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'
import ImageKitImage from '../imagekit-image'

export default function Gallery({ intro, title, images, mainPartOfPage }: GalleryBlock) {
  if (mainPartOfPage) {
    return (
      <section className="bg-accent-50 py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          {title ? <PageTitle intro={intro} title={title} /> : null}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {images.map((image) => {
              if (typeof image === 'string') return null

              return (
                <figure key={image.id}>
                  <ImageKitImage
                    image={image}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image) => {
        if (typeof image === 'string') return null

        return (
          <figure key={image.id}>
            <ImageKitImage
              image={image}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </figure>
        )
      })}
    </div>
  )
}
