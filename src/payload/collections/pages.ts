import type { CollectionConfig } from 'payload'
import richText from '../blocks/rich-text'
import contactForm from '../blocks/contact-form'
import { generatePreviewPath, revalidateDelete, revalidatePage } from '@/lib/live-preview'
import selectedWork from '../blocks/selected-work'
import hero from '../blocks/hero'
import theStudio from '../blocks/the-studio'
import exhibitions from '../blocks/exhibitions'
import gallery from '../blocks/gallery'
import timeline from '../blocks/timeline'
import locationMap from '../blocks/location-map'
import textWithImage from '../blocks/text-with-image'

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
    drafts: {
      autosave: {
        interval: 100,
      },
    },
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
              blocks: [
                richText,
                contactForm,
                selectedWork,
                hero,
                theStudio,
                exhibitions,
                gallery,
                timeline,
                textWithImage,
                locationMap,
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default pages
