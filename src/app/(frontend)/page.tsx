import type { Metadata } from 'next'
import { getPageBySlug } from '@/lib/fetchers'
import Page from './[slug]/page'

export default Page

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')

  if (!page) {
    return {
      title: 'Website template',
      description: 'Website template description',
    }
  }

  return {
    title: 'Willkommen | Website template',
    description: page.description,
  }
}
