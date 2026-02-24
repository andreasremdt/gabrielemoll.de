import type { Block } from 'payload'

const gallery: Block = {
  slug: 'gallery',
  labels: {
    plural: 'Galerie',
    singular: 'Galerie',
  },
  interfaceName: 'GalleryBlock',
  imageURL: '/blocks/gallery.png',
  fields: [
    {
      name: 'mainPartOfPage',
      type: 'checkbox',
      label: 'Ist diese Galerie Hauptteil einer Seite?',
      defaultValue: true,
    },
    {
      name: 'intro',
      type: 'text',
      label: 'Einleitung',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.mainPartOfPage),
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.mainPartOfPage),
      },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Weiterer Text',
    },
    {
      name: 'images',
      type: 'upload',
      label: 'Bilder',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
  ],
}

export default gallery
