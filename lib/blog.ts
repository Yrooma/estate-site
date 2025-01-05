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
        const slug = file.replace(/\.mdx$/, '')
        const fullPath = path.join(postsDirectory, file)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        
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

export async function getPostBySlug(slug: string) {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

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
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

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