import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { properties } from '@/app/data/properties'
import { services } from '@/app/data/services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alamridhafer.com'
  
  // قائمة الصفحات الثابتة
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
    '/properties',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // الحصول على جميع مقالات المدونة ديناميكيًا
  const posts = await getAllPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // إضافة صفحات العقارات
  const propertyPages = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // إضافة صفحات الخدمات
  const servicePages = services.map((service, index) => ({
    url: `${baseUrl}/services/${index + 1}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...propertyPages, ...servicePages]
}
