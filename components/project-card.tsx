"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import * as TechIcons from "./tech-icons"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  delay?: number
}

export function ProjectCard({ title, description, image, technologies, link, delay = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="overflow-hidden rounded-xl glass-card shadow-lg"
    >
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mb-4 text-cv-light-gray">{description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech) => {
            // Check if the tech icon exists in TechIcons
            const IconComponent = (TechIcons as any)[tech]
            return (
              <div key={tech} className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                {IconComponent ? <IconComponent className="h-4 w-4" /> : null}
                <span>{tech}</span>
              </div>
            )
          })}
        </div>

        {link && (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cv-orange hover:underline"
          >
            <span>View Project</span>
            <ExternalLink size={16} />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

