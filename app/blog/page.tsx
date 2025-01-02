// إزالة 'use client'
import { BlogCard } from '@/components/blog-card'
import { CategoryFilter } from "@/components/category-filter"
import { getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'

export default async function Blog() {
  // جلب المقالات مباشرة بدون useState و useEffect
  const posts = await getAllPosts()
  
  // استخراج جميع التصنيفات الفريدة
  const allCategories = Array.from(
    new Set(
      posts.flatMap(post => post.categories || [])
    )
  )

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">الفوائد العقارية</h1>
      
      {/* تحويل CategoryFilter إلى client component منفصل */}
      <CategoryFilter 
        categories={allCategories}
        posts={posts}
      />
    </div>
  )
}