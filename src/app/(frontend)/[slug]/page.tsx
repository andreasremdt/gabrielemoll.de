import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlockRenderer from '@/components/block-renderer'
import { getPageBySlug } from '@/lib/fetchers'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params

  const page = await getPageBySlug(slug || 'home')

  if (!page) {
    notFound()
  }

  return <BlockRenderer blocks={page.content} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPageBySlug(slug || 'home')

  if (!page) {
    return {
      title: 'Seite nicht gefunden',
      description:
        'Die von Ihnen gewünschte Seite konnte nicht gefunden werden. Bitte vergewissern Sie sich, das die URL stimmt.',
    }
  }

  return {
    title: page.title,
    description: page.description,
  }
}
