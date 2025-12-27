import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import users from './payload/collections/users'
import media from './payload/collections/media'
import pages from './payload/collections/pages'
import messages from './payload/collections/messages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [users, media, pages, messages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
    connectOptions: {
      dbName: process.env.DATABASE_NAME,
      appName: process.env.DATABASE_APP_NAME,
      retryWrites: true,
      writeConcern: {
        w: 'majority',
      },
    },
  }),
  email: nodemailerAdapter({
    defaultFromAddress: 'no-reply@regio-lions.com',
    defaultFromName: 'Regio Lions',
    transportOptions: {
      host: process.env.EMAIL_SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
    },
  }),
  graphQL: {
    disable: true,
  },
  i18n: {
    supportedLanguages: { de, en },
    fallbackLanguage: 'de',
  },
  plugins: [
    seoPlugin({
      collections: ['pages'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${doc.title} - Website title`,
      generateDescription: ({ doc }) => doc.description,
    }),
  ],
})
