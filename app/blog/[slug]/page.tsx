"use client";

import { SectionTitle } from "@/components/section-title";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const posts = await getBlogPosts();
        const foundPost = posts.find(p => p.slug.current === slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-glow">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-cv-gray rounded mb-8 w-32"></div>
            <div className="h-12 bg-cv-gray rounded mb-6"></div>
            <div className="aspect-video bg-cv-gray rounded-xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-cv-gray rounded"></div>
              <div className="h-4 bg-cv-gray rounded w-5/6"></div>
              <div className="h-4 bg-cv-gray rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-gradient-glow">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
            <p className="text-cv-light-gray mb-8">
              The blog post you're looking for doesn't exist.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cv-orange hover:text-cv-neon transition-colors duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-glow">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cv-orange hover:text-cv-neon transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article */}
        <article>
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-cv-light-gray"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          {post.mainImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="aspect-video w-full overflow-hidden rounded-xl mb-8"
            >
              <Image
                src={post.mainImage}
                alt={post.title}
                width={800}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
          )}

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full glass px-4 py-2 text-sm text-white"
                >
                  {category}
                </span>
              ))}
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-xl glass-card p-8"
          >
            {post.excerpt && (
              <div className="mb-8">
                <p className="text-xl text-cv-light-gray leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            )}
            
            <div className="prose prose-invert max-w-none">
              <p className="text-cv-light-gray leading-relaxed mb-6">
                This is a demo blog post. In a real implementation, you would render the actual blog content here using a rich text renderer for your CMS content.
              </p>
              
              <p className="text-cv-light-gray leading-relaxed mb-6">
                The blog feature has been successfully integrated into your portfolio website with a modern design that matches your existing aesthetic. The blog section appears before the "Recent Projects" section as requested.
              </p>
              
              <p className="text-cv-light-gray leading-relaxed">
                To complete the setup, you would need to:
              </p>
              
              <ul className="text-cv-light-gray leading-relaxed mt-4 space-y-2">
                <li>• Set up your Sanity Studio</li>
                <li>• Create blog post schemas in Sanity</li>
                <li>• Add actual blog content</li>
                <li>• Implement rich text rendering for blog content</li>
              </ul>
            </div>
          </motion.div>
        </article>
      </div>
    </main>
  );
}