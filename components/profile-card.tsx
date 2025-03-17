"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Twitter, Instagram } from "lucide-react"
import * as TechIcons from "./tech-icons"
import Link from "next/link"

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl glass-card p-6 shadow-lg"
    >
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {/* Dotted line decoration */}
          <div className="absolute -right-16 -top-16 h-32 w-32 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>

          <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg">
            <Image
              src="https://ik.imagekit.io/onefestival/general/profile-photo.png?updatedAt=1742221494292"
              alt="John's profile picture"
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Dotted line decoration */}
          <div className="absolute -bottom-8 -left-8 h-24 w-24 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>
        </div>

        <h2 className="mb-1 text-2xl font-bold text-white">John Anthony Pecson</h2>

        <div className="mb-6 flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-cv-orange"></div>
          <span className="text-gray-300">Software Engineer</span>
        </div>

        <p className="mb-6 text-center text-gray-300">
          A Software Engineer who has developed countless innovative solutions.
        </p>

        <div className="flex space-x-4">
          <Link
            href="https://github.com/jonpecson"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="#"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </Link>
          <Link
            href="#"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="mailto:jonpecson.io@gmail.com"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
          >
            <TechIcons.Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

