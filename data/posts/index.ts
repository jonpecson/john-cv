import { BlogPost } from '@/types/blog'
import { getPosts2024 } from './2024'
import { getPosts2025 } from './2025'
import { getPosts2026 } from './2026'

export function getAllPosts(): BlogPost[] {
  const allPosts = [
    ...getPosts2024(),
    ...getPosts2025(),
    ...getPosts2026(),
  ]

  // Sort by publishedAt descending (newest first)
  return allPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}
