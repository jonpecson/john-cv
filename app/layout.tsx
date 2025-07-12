import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John Pecson | Senior Full-Stack Engineer & Architect",
  keywords: [
    "John Pecson",
    "Senior Software Engineer",
    "Solutions Architect",
    "Full-stack Developer",
    "Blockchain Developer",
    "DeFi Engineer",
    "React Expert",
    "Next.js Specialist",
    "Nest.js Developer",
    "AWS Architect",
    "Web3 Developer",
    "Smart Contract Engineer",
    "FinTech Developer",
    "High-Traffic Systems",
    "Microservices Architecture",
    "Real-time Applications",
    "WebSocket Implementation",
    "CI/CD Pipelines",
    "Serverless Architecture",
    "Performance Optimization",
    "Security Hardening",
    "Technical Leadership",
    "System Design",
    "Scalable Infrastructure",
  ],
  authors: [{ name: "John Pecson", url: "https://johnpecson.com" }],
  description:
    "Building scalable, secure digital products with 10+ years of experience in full-stack development, blockchain, and cloud architecture.",
  openGraph: {
    title: "John Pecson | Senior Full-Stack Engineer & Architect",
    description:
      "Specializing in high-performance web applications, DeFi platforms, and enterprise-grade solutions with React, Node.js, and AWS.",
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
    title: "John Pecson | Senior Full-Stack Engineer",
    description:
      "Architecting scalable web applications and blockchain solutions with React, Node.js, and AWS.",
    images: [
      "https://ik.imagekit.io/onefestival/cv/john-pecson-website.png??tr=w-1200",
    ],
  },
  themeColor: "#1a202c",
  colorScheme: "dark",
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
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  metadataBase: new URL("https://johnpecson.com"),
  alternates: {
    canonical: "/",
  },
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
