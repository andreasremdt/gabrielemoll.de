import type { CollectionConfig } from 'payload'

const messages: CollectionConfig = {
  slug: 'messages',
  admin: {
    useAsTitle: 'firstname',
  },
  labels: {
    singular: 'Nachricht',
    plural: 'Nachrichten',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: () => false,
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'firstname',
      label: 'Vorname',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastname',
      label: 'Nachname',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'email',
      label: 'E-Mail',
      type: 'email',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'phone',
      label: 'Telefonnummer',
      type: 'text',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'message',
      label: 'Nachricht',
      type: 'textarea',
      required: true,
      admin: {
        rows: 10,
      },
    },
  ],
}

export default messages
