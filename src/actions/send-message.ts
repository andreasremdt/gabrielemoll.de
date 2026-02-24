'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import { validateMessageForm, hasValidationErrors, type ValidationErrors } from '@/lib/validation'

type FormInputData = {
  name: string
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

  const { name, email, phone, message } = data

  try {
    const payload = await getPayload({ config })

    await payload.sendEmail({
      to: process.env.EMAIL_SMTP_TO,
      from: process.env.EMAIL_SMTP_USER,
      subject: `Anfrage von ${name}`,
      replyTo: email,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\n${message}`,
    })

    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        phone,
        message,
      },
    })

    return { success: true }
  } catch (_) {
    console.error(_)
    return {
      success: false,
      values: data,
    }
  }
}
