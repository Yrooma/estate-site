'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { BlogCard } from '@/components/blog-card'
import type { BlogPost } from '@/types/blog'

interface CategoryFilterProps {
  categories: string[]
  posts: BlogPost[]
}

export function CategoryFilter({ categories, posts }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.categories?.includes(selectedCategory))
    : posts

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        <Badge 
          variant={selectedCategory === null ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory(null)} // تم تصحيح هذا السطر
        >
          الكل
        </Badge>
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "secondary"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category)} // تم تصحيح هذا السطر
          >
            {category}
          </Badge>
        ))}
      </div>



      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-600">
          {selectedCategory 
            ? 'لا توجد مقالات في هذا التصنيف' 
            : 'سيتم إضافة المقالات قريباً'
          }
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  )
}