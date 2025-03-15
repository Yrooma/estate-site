import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import type { BlogPost } from '@/types/blog'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // التحقق من وجود المجلد
    if (!fs.existsSync(postsDirectory)) {
      console.error('Blog directory not found:', postsDirectory)
      return []
    }

    const files = fs.readdirSync(postsDirectory)
    
    const posts = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => {
        const fullPath = path.join(postsDirectory, file)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
        // استخدام الـ slug من الـ frontmatter إذا كان موجودًا، وإلا استخدام اسم الملف مع تحويله إلى slug آمن
        const slug = data.slug || createSafeSlug(file.replace(/\.mdx$/, ''))
        
        return {
          slug,
          title: data.title,
          date: data.date,
          description: data.description,
          image: data.image,
          categories: data.categories || [],
          keywords: data.keywords || [],
          author: data.author || 'ظافر العمري'
        } as BlogPost
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// دالة لإنشاء slug آمن من النص العربي
function createSafeSlug(text: string): string {
  // تحويل النص العربي إلى slug آمن للاستخدام في URLs
  // يمكن استخدام أرقام تسلسلية أو تاريخ النشر كجزء من الـ slug
  // هذا مثال بسيط يستخدم تشفير base64 مع إزالة الأحرف غير الآمنة
  const base64 = Buffer.from(text).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  
  // استخدام جزء من الـ base64 لتقصير الـ slug
  return base64.substring(0, 20)
}

// دالة للعثور على الملف بناءً على الـ slug
async function findFileBySlug(slug: string): Promise<string | null> {
  try {
    const files = fs.readdirSync(postsDirectory)
    
    // البحث في جميع الملفات
    for (const file of files) {
      if (!file.endsWith('.mdx')) continue
      
      const fullPath = path.join(postsDirectory, file)
      const fileContent = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContent)
      
      // التحقق من الـ slug في الـ frontmatter أو إنشاء واحد من اسم الملف
      const fileSlug = data.slug || createSafeSlug(file.replace(/\.mdx$/, ''))
      
      if (fileSlug === slug) {
        return file
      }
    }
    
    return null
  } catch (error) {
    console.error('Error finding file by slug:', error)
    return null
  }
}

export async function getPostBySlug(slug: string) {
  try {
    // البحث عن الملف بناءً على الـ slug
    const fileName = await findFileBySlug(slug)
    
    if (!fileName) {
      return null
    }
    
    const fullPath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)
    
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true }
    })
    
    return {
      content: mdxContent,
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
      categories: data.categories || [],
      keywords: data.keywords || [],
      author: data.author || 'ظافر العمري'
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getPost(slug: string) {
  try {
    // استخدام نفس الدالة للعثور على الملف بناءً على الـ slug
    const fileName = await findFileBySlug(slug)
    
    if (!fileName) {
      return null
    }
    
    const fullPath = path.join(postsDirectory, fileName)
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContent)
    
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true }
    })
    
    return {
      content: mdxContent,
      slug,
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
      categories: data.categories || [],
      keywords: data.keywords || [],
      author: data.author || 'ظافر العمري'
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}


export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
