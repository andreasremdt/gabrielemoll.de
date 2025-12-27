import type { Block } from 'payload'

const richText: Block = {
  slug: 'richText',
  labels: {
    plural: 'Freitext',
    singular: 'Freitext',
  },
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Inhalt',
      required: true,
    },
  ],
}

export default richText
