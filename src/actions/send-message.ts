'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { validateMessageForm, hasValidationErrors, type ValidationErrors } from '@/lib/validation'

type FormInputData = {
  firstname: string
  lastname: string
  email: string
  phone?: string
  message: string
}

type SendMessageState = {
  success: boolean
  errors?: ValidationErrors
  values?: FormInputData
}

export default async function sendMessage(data: FormInputData): Promise<SendMessageState> {
  // Validate input data
  const errors = validateMessageForm(data)

  if (hasValidationErrors(errors)) {
    return {
      success: false,
      errors,
      values: data,
    }
  }

  const { firstname, lastname, email, phone, message } = data

  try {
    const payload = await getPayload({ config })

    await payload.sendEmail({
      to: '',
      subject: `Anfrage von ${firstname} ${lastname}`,
      replyTo: email,
      text: `Name: ${firstname} ${lastname}\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\n${message}`,
    })

    await payload.create({
      collection: 'messages',
      data: {
        firstname,
        lastname,
        email,
        phone,
        message,
      },
    })

    return { success: true }
  } catch (_) {
    return {
      success: false,
      values: data,
    }
  }
}
