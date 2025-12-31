import type { CollectionConfig } from 'payload'

const exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Ausstellung',
    plural: 'Ausstellungen',
  },
  fields: [
    {
      name: 'title',
      label: 'Titel',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Beschreibung',
      type: 'textarea',
    },
    {
      name: 'date',
      label: 'Datum',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'published',
      label: 'Veröffentlicht',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      label: 'Bild',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default exhibitions
