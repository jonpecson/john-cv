"use client"

import { motion } from "framer-motion"
import { CalendarDays } from "lucide-react"
import * as TechIcons from "./tech-icons"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string | string[]
  technologies: string[]
  delay?: number
}

export function ExperienceCard({ title, company, period, description, technologies, delay = 0 }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl glass-card p-6 shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-cv-orange">{company}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full glass px-3 py-1 text-sm text-white">
          <CalendarDays className="h-4 w-4" />
          <span>{period}</span>
        </div>
      </div>

      <div className="mb-4 text-cv-light-gray">
        {typeof description === "string" ? (
          <p>{description}</p>
        ) : (
          <ul className="ml-5 list-disc space-y-1">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
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
    </motion.div>
  )
}

