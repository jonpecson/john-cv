import { BlogPost } from '@/types/blog'
import { getAllPosts } from '@/data/posts'

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getAllPosts()
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = getAllPosts()
  return posts.find(p => p.slug.current === slug) || null
}
