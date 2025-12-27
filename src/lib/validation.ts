type FormInputData = {
  firstname: string
  lastname: string
  email: string
  phone?: string
  message: string
}

export type ValidationErrors = {
  firstname?: string[]
  lastname?: string[]
  email?: string[]
  phone?: string[]
  message?: string[]
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10

export function validateFirstname(value: string): string | undefined {
  if (!value || value.trim() === '') {
    return 'Vorname ist erforderlich'
  }

  return undefined
}

export function validateLastname(value: string): string | undefined {
  if (!value || value.trim() === '') {
    return 'Nachname ist erforderlich'
  }

  return undefined
}

export function validateEmail(value: string): string | undefined {
  if (!value || value.trim() === '') {
    return 'E-Mail ist erforderlich'
  }

  if (!EMAIL_REGEX.test(value)) {
    return 'Ungültige E-Mail-Adresse'
  }

  return undefined
}

export function validateMessage(value: string): string | undefined {
  if (!value || value.trim() === '') {
    return 'Nachricht ist erforderlich'
  }

  if (value.length < MIN_MESSAGE_LENGTH) {
    return 'Nachricht muss mindestens 10 Zeichen lang sein'
  }

  return undefined
}

/**
 * Validates form input data and returns validation errors
 */
export function validateMessageForm(data: FormInputData): ValidationErrors {
  const errors: ValidationErrors = {}

  const firstnameError = validateFirstname(data.firstname)
  if (firstnameError) {
    errors.firstname = [firstnameError]
  }

  const lastnameError = validateLastname(data.lastname)
  if (lastnameError) {
    errors.lastname = [lastnameError]
  }

  const emailError = validateEmail(data.email)
  if (emailError) {
    errors.email = [emailError]
  }

  const messageError = validateMessage(data.message)
  if (messageError) {
    errors.message = [messageError]
  }

  return errors
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}
