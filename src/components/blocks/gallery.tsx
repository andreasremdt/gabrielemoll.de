'use client'

import { useState } from 'react'
import type { GalleryBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'
import ImageKitImage from '../imagekit-image'
import Lightbox from '../lightbox'

export default function Gallery({ intro, title, images, content, mainPartOfPage }: GalleryBlock) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (mainPartOfPage) {
    return (
      <section className="bg-accent-50 py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          {title ? <PageTitle intro={intro} title={title} subtitle={content} /> : null}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {images.map((image, index) => {
              if (typeof image === 'string') return null

              return (
                <figure key={image.id}>
                  <a href={typeof image === 'string' ? image : image.imagekit?.url || ''}
                    onClick={(event) => {
                      event.preventDefault()
                      setCurrentImageIndex(index)
                      setIsLightboxOpen(true)
                    }}>
                    <ImageKitImage
                      image={image}
                      width={300}
                      height={300}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </a>
                </figure>
              )
            })}
          </div>
        </div>

        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          onNext={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
          onPrevious={() =>
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
          }
        />
      </section>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((image, index) => {
        if (typeof image === 'string') return null

        return (
          <figure key={image.id}>
            <a href={typeof image === 'string' ? image : image.imagekit?.url || ''}
              onClick={(event) => {
                event.preventDefault()
                setCurrentImageIndex(index)
                setIsLightboxOpen(true)
              }}>
              <ImageKitImage
                image={image}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </a>
          </figure>
        )
      })}

      <Lightbox
        images={images}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
        onPrevious={() =>
          setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
        }
      />
    </div>
  )
}
