import { revalidatePath } from 'next/cache'
import type { PayloadRequest, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { Page } from '@/payload-types'

type Props = {
  collection: string
  slug: string
  req: PayloadRequest
}

export function generatePreviewPath({ collection, slug, req }: Props) {
  const params = {
    slug,
    collection,
    path: `/${slug}`,
  }

  const encodedParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    encodedParams.append(key, value)
  }

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  return `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      revalidatePath(doc.slug === 'home' ? '/' : `/${doc.slug}`)
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(previousDoc.slug === 'home' ? '/' : `/${previousDoc.slug}`)
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(doc?.slug === 'home' ? '/' : `/${doc?.slug}`)
  }

  return doc
}
