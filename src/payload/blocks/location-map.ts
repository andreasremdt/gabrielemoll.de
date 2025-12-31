import type { Block } from 'payload'

const locationMap: Block = {
  slug: 'locationMap',
  labels: {
    plural: 'Karte',
    singular: 'Karte',
  },
  interfaceName: 'LocationMapBlock',
  imageURL: '/blocks/location-map.png',
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
      required: true,
    },
    {
      type: 'array',
      name: 'directions',
      label: 'Anweisungen',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Inhalt',
        },
      ],
    },
  ],
}

export default locationMap
