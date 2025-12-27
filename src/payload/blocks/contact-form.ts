import { Block } from 'payload'

const contactForm: Block = {
  slug: 'contactForm',
  labels: {
    plural: 'Kontaktformular',
    singular: 'Kontaktformular',
  },
  interfaceName: 'ContactFormBlock',
  fields: [
    {
      name: 'recipient',
      type: 'email',
      label: 'Empfänger',
      required: true,
      admin: {
        description: 'Die E-Mail-Adresse, an die die Nachrichten gesendet werden sollen.',
      },
    },
  ],
}

export default contactForm
