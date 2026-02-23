'use client'

import { useEffect, useState, type MouseEvent } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import ImageKitImage from './imagekit-image'
import useFocusTrap from '@/hooks/use-focus-trap'
import { cn } from '@/lib/utils'
import Icon from './ui/icon'

type LightboxProps = {
  images: (string | Media)[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [isLoading, setIsLoading] = useState(true)
  const focusTrapRef = useFocusTrap<HTMLDivElement>(isOpen)

  const currentImage = images[currentIndex]
  const imageUrl =
    typeof currentImage === 'string' ? currentImage : currentImage?.imagekit?.url || ''
  const imageAlt = typeof currentImage === 'string' ? '' : currentImage?.alt || ''

  // Determine if navigation should be shown
  const showNavigation = onNext && onPrevious && images.length > 1

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        setIsLoading(true)
      } else if (onPrevious && onNext && images.length > 1) {
        if (event.key === 'ArrowLeft') {
          onPrevious()
        } else if (event.key === 'ArrowRight') {
          onNext()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    document.body.classList.add('overflow-hidden')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen, onClose, onNext, onPrevious, images.length])

  // Focus management
  useEffect(() => {
    if (isOpen && focusTrapRef.current) {
      // Focus the close button when lightbox opens
      const closeButton =
        focusTrapRef.current.querySelector<HTMLButtonElement>('[data-lightbox-close]')
      closeButton?.focus()
    }
  }, [isOpen, focusTrapRef])

  // Reset loading state when image changes
  useEffect(() => {
    // @eslint-disable-next-line react-hooks/exhaustive-deps
    setIsLoading(true)
  }, [currentIndex])

  if (!isOpen) return null

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      ref={focusTrapRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Bildergalerie"
      aria-live="polite"
      onClick={handleBackdropClick}
    >
      {/* Close button */}
      <button
        data-lightbox-close
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-10 flex size-12 cursor-pointer items-center justify-center bg-gray-900/80 text-white hover:bg-gray-600/80 focus-visible:ring-4 focus-visible:ring-gray-500/80 focus-visible:outline-hidden"
        aria-label="Lightbox schließen"
      >
        <Icon name="close" className="size-6" />
      </button>

      {/* Previous button */}
      {showNavigation ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 z-10 flex size-12 cursor-pointer items-center justify-center bg-gray-900/80 text-white hover:bg-gray-600/80 focus-visible:ring-4 focus-visible:ring-gray-500/80 focus-visible:outline-hidden"
          aria-label="Vorheriges Bild"
        >
          <Icon name="chevron-left" className="size-6" />
        </button>
      ) : null}

      {/* Next button */}
      {showNavigation ? (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 z-10 flex size-12 cursor-pointer items-center justify-center bg-gray-900/80 text-white hover:bg-gray-600/80 focus-visible:ring-4 focus-visible:ring-gray-500/80 focus-visible:outline-hidden"
          aria-label="Nächstes Bild"
        >
          <Icon name="chevron-right" className="size-6" />
        </button>
      ) : null}

      {/* Image container */}
      <div
        className="relative flex h-full w-max items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="size-12 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          </div>
        ) : null}

        <div
          className={cn('relative h-full transition-opacity duration-300', {
            'opacity-0': isLoading,
            'opacity-100': !isLoading,
          })}
        >
          {typeof currentImage === 'string' ? (
            // Fallback for string URLs (shouldn't happen based on ImageKitImage logic)
            <Image
              src={imageUrl}
              alt={imageAlt}
              className="mx-auto h-full w-full object-contain"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          ) : (
            <ImageKitImage
              image={currentImage}
              className="mx-auto h-full w-full bg-transparent object-contain"
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>

      {/* Image counter */}
      {showNavigation ? (
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-gray-900/80 px-4 py-2 font-sans text-sm text-white bottom-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentIndex + 1} / {images.length}
        </div>
      ) : null}
    </div>
  )
}