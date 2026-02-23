"use client"

import { useState } from 'react'
import type { SelectedWorkBlock } from '@/payload-types'
import ImageKitImage from '@/components/imagekit-image'
import PageTitle from '../ui/page-title'
import { formatDate } from '@/lib/utils'
import Button from '../ui/button'
import Lightbox from '../lightbox'

export default function SelectedWork({ title, work }: SelectedWorkBlock) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = work.filter((entry) => typeof entry !== 'string').map((entry) => entry.image)

  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle title={title} level={2} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-16">
          {work.map((entry, index) => {
            if (typeof entry === 'string') return null

            return (
              <figure key={entry.id}>
                <a href={typeof entry.image === 'string' ? entry.image : entry.image.imagekit?.url || ''}
                  onClick={(event) => {
                    event.preventDefault()
                    setCurrentImageIndex(index)
                    setIsLightboxOpen(true)
                  }}>
                  <ImageKitImage
                    className="mb-4 shadow-xl"
                    image={entry.image}
                    width={400}
                    height={400}
                  />

                </a>
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
