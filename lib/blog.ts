import { client, POSTS_QUERY } from './sanity'
import { BlogPost } from '@/types/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log('getBlogPosts: Attempting to fetch from Sanity...')
    const posts = await client.fetch(POSTS_QUERY)
    console.log('getBlogPosts: Sanity fetch successful:', posts)
    console.log('getBlogPosts: Number of posts from Sanity:', posts?.length || 0)
    return posts || []
  } catch (error) {
    console.error('getBlogPosts: Error fetching blog posts:', error)
    console.log('getBlogPosts: Falling back to mock data')
    // Return mock data for development/demo purposes
    return getMockBlogPosts()
  }
}

// Mock data for development/demo purposes
function getMockBlogPosts(): BlogPost[] {
  return [
    {
      _id: '1',
      title: 'Building Scalable Web Applications with Next.js and AWS',
      slug: { current: 'scalable-web-apps-nextjs-aws' },
      excerpt: 'Learn how to architect and deploy high-performance web applications that can handle millions of users using Next.js, AWS services, and modern DevOps practices.',
      publishedAt: '2024-01-15T10:00:00Z',
      author: 'John Pecson',
      categories: ['Web Development', 'AWS', 'Next.js'],
      mainImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop'
    },
    {
      _id: '2',
      title: 'DeFi Development: Smart Contracts and Security Best Practices',
      slug: { current: 'defi-smart-contracts-security' },
      excerpt: 'Explore the fundamentals of DeFi development, including smart contract architecture, security auditing, and gas optimization techniques for Ethereum-based applications.',
      publishedAt: '2024-01-10T14:30:00Z',
      author: 'John Pecson',
      categories: ['Blockchain', 'DeFi', 'Security'],
      mainImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop'
    },
    {
      _id: '3',
      title: 'Microservices Architecture: From Monolith to Distributed Systems',
      slug: { current: 'microservices-architecture-guide' },
      excerpt: 'A comprehensive guide to breaking down monolithic applications into microservices, including patterns, tools, and real-world implementation strategies.',
      publishedAt: '2024-01-05T09:15:00Z',
      author: 'John Pecson',
      categories: ['Architecture', 'Microservices', 'DevOps'],
      mainImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop'
    },
    {
      _id: '4',
      title: 'React Performance Optimization: Advanced Techniques',
      slug: { current: 'react-performance-optimization' },
      excerpt: 'Deep dive into React performance optimization techniques including memoization, code splitting, and advanced rendering patterns for large-scale applications.',
      publishedAt: '2023-12-28T16:45:00Z',
      author: 'John Pecson',
      categories: ['React', 'Performance', 'Frontend'],
      mainImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop'
    }
  ]
}