import Link from "next/link"
import { Github, Linkedin, Globe } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold">John Anthony Pecson</h3>
            <p className="text-primary">Full Stack Software Engineer</p>
          </div>

          <div className="flex gap-6">
            <Link href="#about" className="text-gray-400 hover:text-primary">
              About
            </Link>
            <Link href="#experience" className="text-gray-400 hover:text-primary">
              Experience
            </Link>
            <Link href="#projects" className="text-gray-400 hover:text-primary">
              Projects
            </Link>
            <Link href="#skills" className="text-gray-400 hover:text-primary">
              Skills
            </Link>
            <Link href="#contact" className="text-gray-400 hover:text-primary">
              Contact
            </Link>
          </div>

          <div className="flex gap-4">
            <Link
              href="https://github.com/jonpecson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <Github size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/jonpecson"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary"
            >
              <Linkedin size={20} />
            </Link>
            <Link
              href="https://johnpecson.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-green-400"
            >
              <Globe size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} John Anthony Pecson. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

