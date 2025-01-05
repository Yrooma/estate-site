import Image from 'next/image'
import { getPost, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from 'next/link'


export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    postId: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { postId: string } }) {
  const post = await getPost(params.postId)
  if (!post) return {}
  
  return {
    title: `${post.title} - ظافر العمري`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    }
  }
}

export default async function BlogPost({ params }: { params: { postId: string } }) {
  const post = await getPost(params.postId)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/blog" className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            العودة إلى المدونة
          </Link>
        </Button>
      </div>
      {/* صورة الغلاف */}
      <div className="relative aspect-[2/1] mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* رأس المقال */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{post.description}</p>
        
        {/* التصنيفات */}
        <div className="flex gap-2 justify-center mb-4">
          {post.categories?.map((category: string) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        {/* معلومات المقال */}
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ar-SA')}
          </time>
          <span>•</span>
          <span>{post.author}</span>
        </div>
      </header>

      {/* محتوى المقال */}
      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>

      {/* تذييل المقال */}
      <footer className="mt-8 pt-8 border-t">
        {/* الكلمات المفتاحية */}
        {post.keywords?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-600">الكلمات المفتاحية:</span>
            {post.keywords.map((keyword: string) => (
              <Badge key={keyword} variant="outline">
                {keyword}
              </Badge>
            ))}
          </div>
        )}
      </footer>
    </article>
  )
}