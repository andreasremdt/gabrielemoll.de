import { Block } from 'payload'

const contactForm: Block = {
  slug: 'contactForm',
  labels: {
    plural: 'Kontaktformular',
    singular: 'Kontaktformular',
  },
  interfaceName: 'ContactFormBlock',
  imageURL: '/blocks/contact-form.png',
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
      name: 'image',
      type: 'upload',
      label: 'Bild',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'group',
      label: 'Anschrift',
      fields: [
        {
          name: 'address',
          type: 'textarea',
          label: 'Anschrift',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      label: 'Kontakt',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefonnummer',
            },
            {
              name: 'mobile',
              type: 'text',
              label: 'Mobilnummer',
            },
          ],
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
          required: true,
        },
      ],
    },
  ],
}

export default contactForm
