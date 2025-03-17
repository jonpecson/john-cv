"use client"

import { motion } from "framer-motion"

interface SectionTitleProps {
  title: string
  delay?: number
}

export function SectionTitle({ title, delay = 0 }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-6"
    >
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-2 h-1 w-16 bg-cv-orange"></div>
    </motion.div>
  )
}

