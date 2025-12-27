import type { CollectionConfig } from 'payload'
import richText from '../blocks/rich-text'
import contactForm from '../blocks/contact-form'
import { generatePreviewPath, revalidateDelete, revalidatePage } from '@/lib/live-preview'

const pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        }),
    },
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: true,
  },
  labels: {
    singular: 'Seite',
    plural: 'Seiten',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Allgemein',
          fields: [
            {
              type: 'group',
              label: 'Allgemein',
              fields: [
                {
                  name: 'title',
                  label: 'Titel',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'Der Titel wird nur für Payload CMS verwendet und taucht nicht auf der Seite selbst auf.',
                  },
                },
                {
                  name: 'slug',
                  label: 'Slug',
                  type: 'text',
                  required: true,
                  admin: {
                    description:
                      'Der Slug wird verwendet, um die Seite im Browser zu identifizieren.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Elemente',
          fields: [
            {
              name: 'content',
              type: 'blocks',
              label: 'Elemente',
              blocks: [richText, contactForm],
            },
          ],
        },
      ],
    },
  ],
}

export default pages
