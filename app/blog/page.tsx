import { Metadata } from 'next'
import { BlogCard } from '@/components/blog-card'
import { CategoryFilter } from "@/components/category-filter"
import { getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'


export const metadata: Metadata = {
  title: 'الفوائد العقارية - أبو عمر للعقار',
  description: 'مقالات ومعلومات قيمة عن العقارات والاستثمار العقاري في مكة والطائف. نصائح عقارية، تحليلات السوق، وأفضل الممارسات في الاستثمار العقاري',
  keywords: [
    'عقارات مكة',
    'عقارات الطائف',
    'استثمار عقاري',
    'نصائح عقارية',
    'سوق العقار السعودي',
    'ظافر العمري',
    'مقالات عقارية'
  ],
  openGraph: {
    title: 'الفوائد العقارية - أبو عمر للعقار',
    description: 'مقالات ومعلومات قيمة عن العقارات والاستثمار العقاري في مكة والطائف',
    type: 'website',
    locale: 'ar_SA',
    siteName: 'ظافر العمري للعقار',
    images: '/images/blog/main.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الفوائد العقارية - ظافر العمري للعقار',
    description: 'مقالات ومعلومات قيمة عن العقارات والاستثمار العقاري'
  },
  alternates: {
    canonical: 'https://www.dhaferalamri.com/blog'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  }
}

export default async function Blog() {
  const posts = await getAllPosts()
  
  const allCategories = Array.from(
    new Set(
      posts.flatMap(post => post.categories || [])
    )
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">الفوائد العقارية</h1>
      
      <CategoryFilter 
        categories={allCategories}
        posts={posts}
      />
    </div>
  )
}