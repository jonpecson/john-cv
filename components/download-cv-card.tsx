"use client";

import { ArrowDownToLine } from "lucide-react";
import type React from "react";
import { motion } from "framer-motion";

interface DownloadCVCardProps {
  title: string;
  subtitle: string;
  link: string;
  color: "orange" | "neon";
  icon: React.ReactNode;
  delay?: number;
}

export function DownloadCVCard({
  title,
  subtitle,
  link,
  color,
  icon,
  delay = 0,
}: DownloadCVCardProps) {
  const bgColor = color === "orange" ? "bg-cv-orange/80" : "bg-cv-neon/80";
  const textColor = color === "orange" ? "text-white" : "text-cv-dark";
  const glassEffect =
    color === "orange"
      ? "backdrop-blur-md border border-cv-orange/20"
      : "backdrop-blur-md border border-cv-neon/20";

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg cursor-pointer transition-transform hover:scale-105 ${bgColor} ${glassEffect}`}
      download>
      <div className="mb-4">{icon}</div>
      <div className="mb-8 space-y-1">
        <h3 className={`text-xl font-bold uppercase ${textColor}`}>{title}</h3>
        <p className={`text-xl font-bold uppercase ${textColor}`}>{subtitle}</p>
      </div>
      <div className="absolute bottom-6 right-6">
        <ArrowDownToLine className={`h-6 w-6 ${textColor}`} />
      </div>
      {/* Background pattern */}
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-10 bg-white"></div>
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-10 bg-white"></div>
    </motion.a>
  );
}
