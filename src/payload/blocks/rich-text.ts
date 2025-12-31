import type { Block } from 'payload'
import gallery from './gallery'
import timeline from './timeline'

const richText: Block = {
  slug: 'richText',
  labels: {
    plural: 'Freitext',
    singular: 'Freitext',
  },
  interfaceName: 'RichTextBlock',
  imageURL: '/blocks/rich-text.png',
  fields: [
    {
      name: 'intro',
      type: 'text',
      label: 'Einleitung',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Nebeninhalt',
      blocks: [gallery, timeline],
    },
  ],
}

export default richText
