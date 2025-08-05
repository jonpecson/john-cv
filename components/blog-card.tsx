"use client";

import { BlogCardProps } from "@/types/blog";
import { Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="overflow-hidden rounded-xl glass-card shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {post.mainImage && (
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={post.mainImage}
            alt={post.title}
            width={600}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="mb-3 flex items-center gap-4 text-sm text-cv-light-gray">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          
          {post.author && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>

        <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cv-orange transition-colors duration-300">
          <Link href={`/blog/${post.slug.current}`}>
            {post.title}
          </Link>
        </h3>
        
        {post.excerpt && (
          <p className="mb-4 text-cv-light-gray line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.categories.map((category) => (
              <span
                key={category}
                className="rounded-full glass px-3 py-1 text-sm text-white"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href={`/blog/${post.slug.current}`}
            className="inline-flex items-center gap-2 text-cv-orange hover:text-cv-neon transition-colors duration-300 font-medium"
          >
            Read More
            <Clock className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}