import type { CollectionConfig } from 'payload'

const users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Benutzer',
    plural: 'Benutzer',
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}

export default users
