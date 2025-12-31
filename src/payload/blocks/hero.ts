import type { Block } from 'payload'

const hero: Block = {
  slug: 'hero',
  labels: {
    plural: 'Hero',
    singular: 'Hero',
  },
  interfaceName: 'HeroBlock',
  imageURL: '/blocks/hero.png',
  fields: [
    {
      name: 'intro',
      type: 'text',
      label: 'Einleitung',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Inhalt',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Bild',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default hero
