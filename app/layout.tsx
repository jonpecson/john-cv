import "./globals.css";
import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

// Update the metadata object with the new title, description, and OG image
export const metadata: Metadata = {
  title: "John",
  description:
    "Finding creative solutions to complex problems. With a passion for technology and a deep understanding of programming, I am constantly tinkering with code to improve my skills and stay up-to-date with the latest industry trends.",
  openGraph: {
    title: "John Anthony Pecson | Software Engineer",
    description:
      "Finding creative solutions to complex problems. With a passion for technology and a deep understanding of programming.",
    images: [
      {
        url: "https://ik.imagekit.io/onefestival/cv/john-pecson-website.png??tr=w-630",
        width: 1200,
        height: 630,
        alt: "John Anthony Pecson - Software Engineer Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "John Anthony Pecson | Software Engineer",
    description:
      "Finding creative solutions to complex problems. With a passion for technology and a deep understanding of programming.",
    images: [
      "https://ik.imagekit.io/onefestival/cv/john-pecson-website.png??tr=w-400",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
