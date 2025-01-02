'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
}

const sharePost = async (post: BlogPost) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: post.title,
        text: post.description,
        url: `${window.location.origin}/blog/${post.slug}`,
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  } else {
    // Fallback for browsers that don't support Web Share API
    const shareData = {
      title: post.title,
      text: post.description,
      url: `${window.location.origin}/blog/${post.slug}`
    }
    
    try {
      await navigator.clipboard.writeText(
        `${shareData.title}\n${shareData.text}\n${shareData.url}`
      )
      alert('تم نسخ رابط المقال!')
    } catch (err) {
      console.error('Error copying to clipboard:', err)
    }
  }
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="p-4">
        <time className="text-sm text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString('ar-SA')}
        </time>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-[#215657]">
            {post.title}
          </h2>
        </Link>
        <p className="mb-4 text-gray-600 line-clamp-2">
          {post.description}
        </p>
        {post.categories && (
          <div className="mb-4 flex gap-2 flex-wrap">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600"
            onClick={() => sharePost(post)} // تم تحديث هذا السطر
            >
            <Share2 className="h-4 w-4 ml-2" />
            مشاركة
          </Button>
          <Button asChild>
            <Link href={`/blog/${post.slug}`}>اقرأ المزيد</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 