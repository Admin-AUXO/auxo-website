import { MetadataRoute } from 'next'
import { seoMetadata } from '../lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoMetadata.url

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}