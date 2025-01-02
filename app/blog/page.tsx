import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { getAllPosts } from '@/lib/blog'
import { Badge } from "@/components/ui/badge"
import { useState } from 'react'

export const metadata = {
  title: 'الفوائد العقارية - أبو عمر للعقار',
  description: 'مقالات ومعلومات عن العقارات والاستثمار العقاري في مكة والطائف'
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
       {/* قسم التصنيفات */}
       <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {allCategories.map((category) => (
          <Badge 
            key={category}
            variant="secondary"
            className="cursor-pointer hover:bg-gray-200"
          >
            {category}
          </Badge>
        ))}
      </div>
        
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">سيتم إضافة المقالات قريباً</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div key={post.slug} className="border rounded-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.image || '/placeholder.svg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(post.date).toLocaleDateString('ar-SA')}
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  {post.description}
                </p>
                {post.categories && (
                  <div className="mb-4 flex gap-2">
                    {post.categories.map((category: string) => (
                      <span 
                        key={category}
                        className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <Button asChild>
                  <Link href={`/blog/${post.slug}`}>اقرأ المزيد</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}