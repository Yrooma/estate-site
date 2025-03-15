'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

const routeNameMap: { [key: string]: string } = {
  services: 'خدماتنا',
  about: 'من نحن',
  blog: 'الفوائد',
  contact: 'تواصل معنا',
  properties: 'العقارات',
  // إضافة ترجمات للمقالات
  'ejar-platform-landlord-rights': 'منصة إيجار: حقوق المؤجر',
  'tawtheeq-ejar-contract': 'توثيق عقد الإيجار'
}

export function Breadcrumbs() {
  const pathname = usePathname()
  if (pathname === '/') return null

  const pathSegments = pathname.split('/').filter(Boolean)
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
    const isLast = index === pathSegments.length - 1
    
    // استخدام الاسم من القاموس أو تنظيف الـ slug إذا كان مشفرًا
    let name = routeNameMap[segment]
    
    if (!name) {
      try {
        // محاولة فك تشفير URL إذا كان يحتوي على أحرف مشفرة
        const decodedSegment = decodeURIComponent(segment)
        name = routeNameMap[decodedSegment] || decodedSegment
      } catch (e) {
        // إذا فشل فك التشفير، استخدم القيمة الأصلية
        name = segment
      }
    }

    return {
      href,
      name,
      isLast
    }
  })

  // إضافة Schema Markup
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://alamridhafer.com${crumb.href}`,
        'name': crumb.name
      }
    }))
  }

  return (
    <>
      <nav aria-label="مسار التصفح" className="py-4 px-6">
        <ol className="flex items-center space-x-2 space-x-reverse text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              الرئيسية
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
              {crumb.isLast ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link 
                  href={crumb.href}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </>
  )
}
