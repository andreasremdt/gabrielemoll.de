import type { Page } from '@/payload-types'
import ContactForm from './blocks/contact-form'
import Prose from './blocks/prose'

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
      default:
        return null
    }
  })
}
