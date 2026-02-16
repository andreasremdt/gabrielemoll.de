import config from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type CollectionSlug, type PayloadRequest, getPayload } from 'payload'

export async function GET(request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret) {
    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  if (!path) {
    return new Response('No path provided', { status: 404 })
  }

  if (!collection) {
    return new Response('No path provided', { status: 404 })
  }

  if (!slug) {
    return new Response('No path provided', { status: 404 })
  }

  if (!path.startsWith('/')) {
    return new Response('This endpoint can only be used for internal previews', { status: 500 })
  }

  try {
    const user = await payload.auth({
      req: request as PayloadRequest,
      headers: request.headers,
    })

    const draft = await draftMode()

    if (!user) {
      draft.disable()

      return new Response('You are not allowed to preview this page', {
        status: 403,
      })
    }

    const result = await payload.find({
      collection,
      draft: true,
      limit: 1,
      pagination: false,
      depth: 0,
      select: {},
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!result.docs.length) {
      return new Response('Document not found', { status: 404 })
    }

    draft.enable()
  } catch (_ex) {
    return new Response('You are not allowed to preview this page', {
      status: 403,
    })
  }

  redirect(path)
}
