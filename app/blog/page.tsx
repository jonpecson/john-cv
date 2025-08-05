"use client";

import { BlogCard } from "@/components/blog-card";
import { SectionTitle } from "@/components/section-title";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-glow">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cv-orange hover:text-cv-neon transition-colors duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Page Title */}
        <SectionTitle title="All Blog Posts" delay={0.1} />

        {/* Blog Posts Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                delay={0.2 + 0.1 * index}
              />
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                className="rounded-xl glass-card p-6"
              >
                <div className="animate-pulse">
                  <div className="aspect-video bg-cv-gray rounded-lg mb-4"></div>
                  <div className="h-4 bg-cv-gray rounded mb-2"></div>
                  <div className="h-4 bg-cv-gray rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-cv-gray rounded mb-2"></div>
                  <div className="h-3 bg-cv-gray rounded w-2/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && blogPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl glass-card p-12 text-center"
          >
            <p className="text-cv-light-gray mb-4 text-lg">
              No blog posts available at the moment.
            </p>
            <p className="text-sm text-cv-light-gray">
              Check back soon for updates and insights!
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}