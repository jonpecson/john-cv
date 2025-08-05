export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  publishedAt: string
  author?: string
  categories?: string[]
  mainImage?: string
  body?: any[]
}

export interface BlogCardProps {
  post: BlogPost
  delay?: number
}