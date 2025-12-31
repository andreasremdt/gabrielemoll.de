import type { Block } from 'payload'

const exhibitions: Block = {
  slug: 'exhibitions',
  labels: {
    plural: 'Ausstellungen',
    singular: 'Ausstellungen',
  },
  interfaceName: 'ExhibitionsBlock',
  imageURL: '/blocks/exhibitions.png',
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
      name: 'numberOfExhibitions',
      type: 'number',
      label: 'Anzahl der anzuzeigenden Ausstellungen',
      defaultValue: 5,
    },
    {
      name: 'linkToExhibitions',
      type: 'checkbox',
      label: 'Linke zur Ausstellungsseite',
      defaultValue: false,
    },
  ],
}

export default exhibitions
