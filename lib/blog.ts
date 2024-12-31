import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

// مسار مجلد المقالات
const postsDirectory = path.join(process.cwd(), 'content/blog')

// جلب جميع المقالات
export async function getAllPosts() {
  // التأكد من وجود المجلد
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  
  const posts = await Promise.all(
    files
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace('.mdx', '')
        const post = await getPostBySlug(slug)
        return { slug, ...post }
      })
  )
  
  // ترتيب المقالات حسب التاريخ (الأحدث أولاً)
  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
}

// جلب مقال محدد حسب المعرف
export async function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    // التحقق من وجود الملف
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContent = fs.readFileSync(fullPath, 'utf8')
    
    // استخراج البيانات الوصفية والمحتوى
    const { data, content } = matter(fileContent)
    
    // تحويل محتوى MDX
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true }
    })
    
    return {
      content: mdxContent,
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
      categories: data.categories || [],
      author: data.author || 'ظافر العمري',
      keywords: data.keywords || []
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}