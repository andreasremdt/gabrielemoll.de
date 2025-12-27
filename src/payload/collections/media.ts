import { Media } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import ImageKitService from '../services/imagekit'

const imageKitService = new ImageKitService(process.env.IMAGEKIT_PRIVATE_KEY)

const media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Medien',
    plural: 'Medien',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (req?.file) {
          try {
            const response = await imageKitService.upload(req.file, {
              folder: process.env.IMAGEKIT_FOLDER,
            })

            return {
              ...data,
              imagekit: response,
            }
          } catch (error) {
            req.payload.logger.error(
              `[plugin-imagekit]: There was an error while uploading the media with filename TEST:`,
            )
            req.payload.logger.error(error)
          }
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        if (doc.imagekit) {
          try {
            await imageKitService.delete(doc.imagekit.fileId)
          } catch (error) {
            req.payload.logger.error(
              `[plugin-imagekit]: There was an error while deleting the media with fileId ${doc.imagekit.fileId}:`,
            )
            req.payload.logger.error(error)
          }
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alternativer Text',
      type: 'text',
      admin: {
        description:
          'Dieser Text wird für Suchmaschinen und Menschen mit Sehbehinderungen benötigt.',
      },
    },
    {
      type: 'group',
      name: 'imagekit',
      label: 'Bildinformationen',
      admin: { readOnly: true, position: 'sidebar' },
      fields: [
        {
          type: 'text',
          label: 'Bild-ID',
          name: 'fileId',
        },
        {
          type: 'text',
          label: 'Vorschaubild-URL',
          name: 'thumbnailUrl',
        },
        {
          type: 'text',
          label: 'Bild-URL',
          name: 'url',
        },
      ],
    },
  ],
  upload: {
    adminThumbnail: ({ doc }) => {
      return (doc as unknown as Media).imagekit?.thumbnailUrl || ''
    },
    disableLocalStorage: true,
  },
}

export default media
