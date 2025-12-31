import type { Block } from 'payload'

const textWithImage: Block = {
  slug: 'textWithImage',
  labels: {
    plural: 'Text mit Bild',
    singular: 'Text mit Bild',
  },
  interfaceName: 'TextWithImageBlock',
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
      type: 'richText',
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
    {
      name: 'imageIsLeft',
      type: 'checkbox',
      label: 'Bild ist links vom Text',
      defaultValue: true,
    },
  ],
}

export default textWithImage
