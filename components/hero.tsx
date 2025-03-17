import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 md:py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full bg-primary/20">
              <Image
                src="https://ik.imagekit.io/onefestival/general/profile-photo.png?updatedAt=1742221494292"
                alt="John's profile picture"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">Hello, I'm John Anthony Pecson</h1>

            <h2 className="mb-6 text-xl text-primary md:text-2xl">Full Stack Software Engineer</h2>

            <p className="mb-8 text-base text-gray-300 md:text-lg">
              Dynamic and results-driven full-stack developer with over 8 years of experience in designing and
              implementing high-performance web and mobile applications. Proficient in MEAN and MERN stack technologies,
              with a strong focus on security and cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full bg-primary px-6 text-white hover:bg-primary/90">
                <Link href="#projects">Explore My Work</Link>
              </Button>
              <Button variant="outline" className="rounded-full border-primary px-6 text-primary hover:bg-primary/10">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute right-0 top-0 -z-10 h-80 w-80 translate-x-1/4 -translate-y-1/4">
        <div className="absolute h-40 w-40 rounded-full bg-primary/10 blur-xl"></div>
        <div className="absolute left-8 top-8 h-40 w-40 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute left-16 top-16 h-40 w-40 rounded-full bg-primary/30 blur-xl"></div>
        <div className="absolute left-24 top-24 h-40 w-40 rounded-full bg-primary/40 blur-xl"></div>
      </div>

      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 translate-x-1/3 translate-y-1/3">
        <div className="absolute h-48 w-48 rounded-full bg-primary/10 blur-xl"></div>
        <div className="absolute left-8 top-8 h-48 w-48 rounded-full bg-primary/20 blur-xl"></div>
        <div className="absolute left-16 top-16 h-48 w-48 rounded-full bg-primary/30 blur-xl"></div>
        <div className="absolute left-24 top-24 h-48 w-48 rounded-full bg-primary/40 blur-xl"></div>
        <div className="absolute left-32 top-32 h-48 w-48 rounded-full bg-purple-600/30 blur-xl"></div>
      </div>
    </section>
  )
}

