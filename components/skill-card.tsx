"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface SkillCardProps {
  title: string
  subtitle: string
  color: "orange" | "neon"
  icon: React.ReactNode
  delay?: number
}

export function SkillCard({ title, subtitle, color, icon, delay = 0 }: SkillCardProps) {
  const bgColor = color === "orange" ? "bg-cv-orange/80" : "bg-cv-neon/80"
  const textColor = color === "orange" ? "text-white" : "text-cv-dark"
  const glassEffect =
    color === "orange" ? "backdrop-blur-md border border-cv-orange/20" : "backdrop-blur-md border border-cv-neon/20"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg ${bgColor} ${glassEffect}`}
    >
      <div className="mb-4">{icon}</div>
      <div className="mb-8 space-y-1">
        <h3 className={`text-xl font-bold uppercase ${textColor}`}>{title}</h3>
        <p className={`text-xl font-bold uppercase ${textColor}`}>{subtitle}</p>
      </div>
      <div className="absolute bottom-6 right-6">
        <ArrowRight className={`h-6 w-6 ${textColor}`} />
      </div>

      {/* Background pattern */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-10 bg-white"></div>
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-10 bg-white"></div>
    </motion.div>
  )
}

