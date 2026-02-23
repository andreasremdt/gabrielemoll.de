'use client'

import { useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import Label from '../ui/label'
import Input from '../ui/input'
import Textarea from '../ui/textarea'
import Button from '../ui/button'
import FieldError from '../ui/field-error'
import Alert from '../ui/alert'
import sendMessage from '@/actions/send-message'
import { validateName, validateEmail, validateMessage } from '@/lib/validation'

export default function ContactFormClient() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setSubmitStatus('loading')

        const response = await sendMessage(value)

        if (!response.success) {
          if (response.errors) {
            Object.entries(response.errors).forEach(([fieldName, fieldErrors]) => {
              if (fieldErrors && fieldErrors.length > 0) {
                form.setFieldMeta(fieldName as keyof typeof value, (prev) => ({
                  ...prev,
                  errors: fieldErrors,
                }))
              }
            })
            return
          }

          throw new Error('Fehler beim Senden der Nachricht')
        }

        setSubmitStatus('success')
      } catch (_) {
        setSubmitStatus('error')
      }
    },
    onSubmitInvalid: () => {
      if (formRef.current) {
        const firstInvalidInput =
          formRef.current.querySelector<HTMLInputElement>('[aria-invalid="true"]')

        if (firstInvalidInput) {
          firstInvalidInput.focus()
        }
      }
    },
  })

  return (
    <>
      {submitStatus === 'success' ? (
        <Alert title="Vielen Dank für Ihre Nachricht." variant="success" className="mb-16">
          Ich werde mich schnellstmöglich um Ihre Nachricht kümmern.
        </Alert>
      ) : null}

      {submitStatus === 'error' ? (
        <Alert title="Fehler beim Senden der Nachricht." variant="error" className="mb-16">
          Bitte versuchen Sie es später erneut oder schreiben Sie mir eine E-Mail an{' '}
          <a
            href="mailto:info@gabrielemoll.de"
            className="text-primary-900 font-medium underline hover:text-gray-900 focus-visible:text-gray-900"
          >
            info@gabrielemoll.de
          </a>
          .
        </Alert>
      ) : null}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        ref={formRef}
        className=""
        noValidate
      >
        <div className="">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => validateName(value),
            }}
          >
            {(field) => (
              <div className="relative mb-8">
                <Input
                  id="name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder=" "
                  required
                  autoComplete="given-name"
                  error={field.state.meta.errors[0]}
                  disabled={submitStatus === 'loading' || submitStatus === 'success'}
                />
                <Label htmlFor="name">Vor- und Nachname</Label>
                <FieldError id={field.name} error={field.state.meta.errors[0]} />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => validateEmail(value),
          }}
        >
          {(field) => (
            <div className="relative mb-8">
              <Input
                type="email"
                id="email"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder=" "
                required
                autoComplete="email"
                error={field.state.meta.errors[0]}
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
              />
              <Label htmlFor="email">E-Mail</Label>
              <FieldError id={field.name} error={field.state.meta.errors[0]} />
            </div>
          )}
        </form.Field>

        <form.Field name="phone">
          {(field) => (
            <div className="relative mb-8">
              <Input
                id="phone"
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder=" "
                autoComplete="tel"
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
              />
              <Label htmlFor="phone">Telefonnummer</Label>
            </div>
          )}
        </form.Field>

        <form.Field
          name="message"
          validators={{
            onChange: ({ value }) => validateMessage(value),
          }}
        >
          {(field) => (
            <div className="relative mb-8">
              <Textarea
                name={field.name}
                id="message"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder=" "
                required
                minLength={10}
                error={field.state.meta.errors[0]}
                disabled={submitStatus === 'loading' || submitStatus === 'success'}
              />
              <Label htmlFor="message">Ihre Nachricht</Label>
              <FieldError id={field.name} error={field.state.meta.errors[0]} />
            </div>
          )}
        </form.Field>

        <Button
          type="submit"
          variant="primary"
          disabled={submitStatus === 'loading' || submitStatus === 'success'}
        >
          {submitStatus === 'success' ? 'Nachricht erfolgreich gesendet' : null}
          {submitStatus === 'loading' ? 'Wird gesendet...' : null}
          {submitStatus === 'idle' || submitStatus === 'error' ? 'Nachricht senden →' : null}
        </Button>
      </form>
    </>
  )
}
