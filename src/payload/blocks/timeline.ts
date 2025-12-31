import type { Block } from 'payload'

const timeline: Block = {
  slug: 'timeline',
  labels: {
    plural: 'Zeitstrahl',
    singular: 'Zeitstrahl',
  },
  interfaceName: 'TimelineBlock',
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
      name: 'type',
      type: 'select',
      label: 'Typ',
      required: true,
      defaultValue: 'withImages',
      options: [
        {
          label: 'Mit Bildern',
          value: 'withImages',
        },
        {
          label: 'Ohne Bilder',
          value: 'withoutImages',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Einträge',
      required: true,
      fields: [
        {
          name: 'year',
          type: 'text',
          label: 'Jahr',
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
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.type === 'withImages'),
          },
        },
      ],
    },
  ],
}

export default timeline
