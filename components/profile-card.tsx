"use client";

import * as TechIcons from "./tech-icons";

import { Github, Linkedin } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl glass-card p-5 shadow-lg">
      <div className="flex flex-col items-center py-4">
        <div className="relative mb-3">
          {/* Dotted line decoration */}
          <div className="absolute -right-14 -top-14 h-28 w-28 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>

          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-full">
            <Image
              src="/images/john-profile.png"
              alt="John's profile picture"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Dotted line decoration */}
          <div className="absolute -bottom-6 -left-6 h-20 w-20 text-cv-orange opacity-50">
            <div className="h-full w-full dotted-line"></div>
          </div>
        </div>

        <h2 className="mb-0.5 text-2xl font-bold text-white">
          John Anthony Pecson
        </h2>

        <div className="mb-4 flex items-center space-x-2">
          <span className="text-cv-orange text-center text-sm font-semibold">
            Full-Stack Engineer | Frontend & Web3
          </span>
        </div>

        <div className="mb-4 text-left text-gray-300 text-sm max-w-sm">
          <p>
            Full-stack engineer with 8+ years building web applications across the entire stack. Strong frontend focus with deep blockchain integration experience.
          </p>
          <ul className="mt-2 list-disc list-inside text-left mx-auto max-w-sm">
            <li className="text-xs pl-3 py-1">React, Next.js, TypeScript — responsive, scalable UIs</li>
            <li className="text-xs pl-3 py-1">Blockchain-enabled frontends with Ethers.js & Web3.js</li>
            <li className="text-xs pl-3 py-1">Node.js, NestJS, PostgreSQL — APIs & backend services</li>
            <li className="text-xs pl-3 py-1">AWS, Docker, WebSockets — deployment & real-time systems</li>
          </ul>
          <p className="mt-2 italic text-xs">
            From frontend interfaces to backend APIs and smart contract integrations — I ship end-to-end.
          </p>
        </div>

        <div className="flex space-x-4">
          <Link
            href="https://github.com/jonpecson"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Github size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/jonpecson"
            className="rounded-full glass p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Linkedin size={20} />
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
