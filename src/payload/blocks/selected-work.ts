import type { Block } from 'payload'

const selectedWork: Block = {
  slug: 'selectedWork',
  labels: {
    plural: 'Selektierte Werke',
    singular: 'Selektierte Werke',
  },
  interfaceName: 'SelectedWorkBlock',
  imageURL: '/blocks/selected-work.png',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'work',
      type: 'relationship',
      label: 'Werke',
      relationTo: 'works',
      hasMany: true,
      required: true,
    },
  ],
}

export default selectedWork
