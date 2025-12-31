import type { Page } from '@/payload-types'
import ContactForm from './blocks/contact-form'
import Prose from './blocks/prose'
import SelectedWork from './blocks/selected-work'
import Hero from './blocks/hero'
import TheStudio from './blocks/the-studio'
import Exhibitions from './blocks/exhibitions'
import Gallery from './blocks/gallery'
import Timeline from './blocks/timeline'
import LocationMap from './blocks/location-map'

type Props = {
  blocks: Page['content']
}

export default function BlockRenderer({ blocks }: Props) {
  if (!blocks) return null

  return blocks.map((block) => {
    switch (block.blockType) {
      case 'richText':
        return <Prose {...block} key={block.id} />
      case 'contactForm':
        return <ContactForm {...block} key={block.id} />
      case 'selectedWork':
        return <SelectedWork {...block} key={block.id} />
      case 'hero':
        return <Hero {...block} key={block.id} />
      case 'theStudio':
        return <TheStudio {...block} key={block.id} />
      case 'exhibitions':
        return <Exhibitions {...block} key={block.id} />
      case 'gallery':
        return <Gallery {...block} key={block.id} />
      case 'timeline':
        return <Timeline {...block} key={block.id} />
      case 'locationMap':
        return <LocationMap {...block} key={block.id} />
      default:
        return null
    }
  })
}
