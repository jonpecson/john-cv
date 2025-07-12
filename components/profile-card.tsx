"use client";

import * as TechIcons from "./tech-icons";

import { Github, Instagram, Twitter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl glass-card p-6 shadow-lg">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-4">
          {/* Dotted line decoration */}
          <div className="absolute -right-16 -top-16 h-32 w-32 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>

          <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-full">
            <Image
              src="https://ik.imagekit.io/onefestival/cv/john-profile-photo.jpg?tr=w-200"
              alt="John's profile picture"
              width={160}
              height={160}
              className="h-full w-full object-cover "
            />
          </div>

          {/* Dotted line decoration */}
          <div className="absolute -bottom-8 -left-8 h-24 w-24 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>
        </div>

        <h2 className="mb-1 text-2xl font-bold text-white">
          John Anthony Pecson
        </h2>

        <div className="mb-6 flex items-center space-x-2">
          {/* <div className="h-2 w-2 rounded-full bg-cv-orange"></div> */}
          <span className="text-gray-300 text-center font-semibold">
            I’m a product designer and developer...
          </span>
        </div>

        <div className="mb-6 text-left text-gray-300 text-sm max-w-sm">
          <p>
            I’m a Software Engineer and Architect with 10+ years of building
            high-traffic web and mobile applications. I specialize in:
          </p>
          <ul className="mt-2 list-disc list-inside text-left mx-auto max-w-sm">
            <li>Full-stack development (React, Node.js)</li>
            <li>Cloud infrastructure (AWS, Docker)</li>
            <li>CI/CD pipelines (GitHub Actions, Jenkins)</li>
            <li>System design for scalability and security</li>
          </ul>
          <p className="mt-2">
            I don’t just write code—I engineer systems that handle millions of
            users, deploy seamlessly, and stay cost-efficient.
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            href="https://github.com/jonpecson"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Github size={20} />
          </Link>
          <Link
            href="#"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Twitter size={20} />
          </Link>
          <Link
            href="#"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Instagram size={20} />
          </Link>
          <Link
            href="mailto:jonpecson.io@gmail.com"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <TechIcons.Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
