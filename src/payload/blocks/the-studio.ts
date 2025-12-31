import type { Block } from 'payload'

const theStudio: Block = {
  slug: 'theStudio',
  labels: {
    plural: 'Das Atelier',
    singular: 'Das Atelier',
  },
  interfaceName: 'TheStudioBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Einleitung',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Inhalt',
      required: true,
    },
  ],
}

export default theStudio
