import { ReactElement } from 'react'

export interface BlogPost {
  content?: ReactElement
  title: string
  date: string
  description: string
  image: string
  categories?: string[]
  author?: string
  keywords?: string[]
  slug: string
} 