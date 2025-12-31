import type { MetadataRoute } from 'next'
import { getAllPages } from '@/lib/fetchers'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages()

  return pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: page.slug === 'home' ? 1 : 0.5,
  }))
}
