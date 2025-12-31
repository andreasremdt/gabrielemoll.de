import type { CollectionConfig } from 'payload'

const works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Werk',
    plural: 'Werke',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,
    },
    {
      name: 'image',
      label: 'Bild des Werks',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default works
