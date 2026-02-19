import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John Pecson | Full-Stack Engineer | Frontend & Web3",
  keywords: [
    "John Pecson",
    "Senior Software Engineer",
    "Full-stack Developer",
    "Blockchain Developer",
    "Web3 Developer",
    "DeFi Engineer",
    "React Expert",
    "Next.js Specialist",
    "NestJS Developer",
    "Node.js Engineer",
    "Solidity Developer",
    "Ethers.js",
    "Web3.js",
    "AWS Architect",
    "NEM Blockchain",
    "ProximaX",
    "Smart Contract Engineer",
    "FinTech Developer",
    "High-Traffic Systems",
    "Microservices Architecture",
    "Real-time Applications",
    "WebSocket Implementation",
    "CI/CD Pipelines",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "Technical Leadership",
    "System Design",
    "Scalable Infrastructure",
  ],
  authors: [{ name: "John Pecson", url: "https://johnpecson.com" }],
  description:
    "Senior Full-Stack Engineer with 8+ years building scalable web applications, blockchain solutions, and real-time trading platforms. Specializing in React, Next.js, NestJS, Solidity, and AWS cloud architecture.",
  openGraph: {
    title: "John Pecson | Full-Stack Engineer | Frontend & Web3",
    description:
      "8+ years building scalable web applications, blockchain solutions, and real-time trading platforms with React, Next.js, NestJS, and AWS.",
    images: [
      {
        url: "https://ik.imagekit.io/onefestival/cv/john-pecson-website.png??tr=w-1200",
        width: 1200,
        height: 630,
        alt: "John Pecson - Senior Full-Stack Engineer Portfolio",
      },
    ],
    type: "website",
    url: "https://johnpecson.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jonpecson",
    creator: "@jonpecson",
    title: "John Pecson | Full-Stack Engineer | Frontend & Web3",
    description:
      "8+ years building scalable web applications, blockchain solutions, and real-time trading platforms with React, Next.js, NestJS, and AWS.",
    images: [
      "https://ik.imagekit.io/onefestival/cv/john-pecson-website.png??tr=w-1200",
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  metadataBase: new URL("https://johnpecson.com"),
  alternates: {
    canonical: "/",
  },
};

export const viewport = {
  themeColor: "#1a202c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-900 text-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
