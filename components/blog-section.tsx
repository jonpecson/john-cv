"use client";

import { BlogPost } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { SectionTitle } from "./section-title";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface BlogSectionProps {
  posts: BlogPost[];
  delay?: number;
}

export function BlogSection({ posts, delay = 0 }: BlogSectionProps) {
  // Show only the latest 3 posts in the main page
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="mb-16">
      <SectionTitle title="Recent Posts" delay={delay} />
      
      {featuredPosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1">
            {featuredPosts.map((post, index) => (
              <BlogCard
                key={post._id}
                post={post}
                delay={delay + 0.1 * (index + 1)}
              />
            ))}
          </div>
          
          {posts.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.4 }}
              className="mt-8 text-center"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-xl glass-card px-6 py-3 text-white hover:text-cv-orange transition-all duration-300 hover:scale-105"
              >
                View All Posts
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="rounded-xl glass-card p-8 text-center"
        >
          <p className="text-cv-light-gray mb-4">
            No blog posts available at the moment.
          </p>
          <p className="text-sm text-cv-light-gray">
            Check back soon for updates and insights!
          </p>
        </motion.div>
      )}
    </section>
  );
}