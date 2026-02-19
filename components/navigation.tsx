"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "glass-dark shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            John Pecson
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="#about" className="text-gray-300 hover:text-primary">
              About
            </Link>
            <Link href="#experience" className="text-gray-300 hover:text-primary">
              Experience
            </Link>
            <Link href="#projects" className="text-gray-300 hover:text-primary">
              Projects
            </Link>
            <Link href="#skills" className="text-gray-300 hover:text-primary">
              Skills
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-primary">
              Blog
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-primary">
              Contact
            </Link>
            <Button className="rounded-full glass-primary hover:bg-primary/30 text-white">
              <a href="/john-resume.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
          </div>

          <button
            className="text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute inset-x-0 top-16 z-50 glass-dark p-4 shadow-md md:hidden">
          <div className="flex flex-col space-y-4">
            <Link href="#about" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link
              href="#experience"
              className="text-gray-300 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className="text-gray-300 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link href="#skills" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Skills
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link href="#contact" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            <Button className="rounded-full glass-primary hover:bg-primary/30 text-white">
              <a href="/john-resume.pdf" target="_blank" rel="noopener noreferrer">
                Download CV
              </a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
