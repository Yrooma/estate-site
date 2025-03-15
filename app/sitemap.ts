import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alamridhafer.com'
  
  // قائمة الصفحات الثابتة
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/services',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // يمكنك إضافة المزيد من الصفحات الديناميكية هنا
  // مثال: صفحات المدونة
  const blogPages = [
    '/blog/post-1',
    // ... المزيد من المقالات
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
