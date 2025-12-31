import type { GlobalConfig } from 'payload'

const menus: GlobalConfig = {
  slug: 'menus',
  label: 'Menüs',
  fields: [
    {
      type: 'group',
      label: 'Hauptmenü',
      fields: [
        {
          name: 'mainMenu',
          type: 'relationship',
          label: 'Einträge',
          relationTo: 'pages',
          hasMany: true,
          required: true,
        },
      ],
    },
    {
      type: 'group',
      label: 'Fußmenü',
      fields: [
        {
          name: 'footerMenu',
          type: 'relationship',
          label: 'Einträge',
          relationTo: 'pages',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
}

export default menus
