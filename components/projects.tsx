import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function Projects() {
  return (
    <section id="projects" className="bg-secondary py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Featured Projects</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            title="WeighSlim"
            description="A semaglutide weight loss program service provider website with customer and admin dashboard. Provides information and services related to using semaglutide as a weight loss aid."
            image="/placeholder.svg?height=200&width=400"
            link="Demo"
            technologies={["Next.js", "Node.js", "Firebase/MySQL"]}
          />

          <ProjectCard
            title="One Festival PH"
            description="Mobile app for festival-goers in the Philippines with festival maps, line-up information, artist bios, and real-time updates to enhance the festival experience."
            image="/placeholder.svg?height=200&width=400"
            link="Demo"
            technologies={["Angular", "Ionic", "Firebase"]}
          />

          <ProjectCard
            title="MeetMe"
            description="Social media platform that allows creators to offer subscription-based content to their fans across various industries including art, music, writing, and podcasting."
            image="/placeholder.svg?height=200&width=400"
            link="Demo"
            technologies={["Angular", "Ionic", "Firebase"]}
          />

          <ProjectCard
            title="Safebook PH"
            description="Digital contact tracing app and incident management system used during COVID-19. Deployed to over 200 business establishments in the Philippines for visitor tracking and report generation."
            image="/placeholder.svg?height=200&width=400"
            link="Demo"
            technologies={["Angular", "Ionic", "Firebase"]}
          />

          <ProjectCard
            title="ProximaX Mobile Wallet"
            company="ProximaX Blockchain"
            description="Wallet and browser app for digital assets. Purchase, transfer, utilize, and swap assets, settle payments, trade, lend, borrow, and engage with digital content."
            image="/placeholder.svg?height=200&width=400"
            link="https://play.google.com/store/apps/details?id=io.proximax.walletv2"
            technologies={["Angular", "Ionic", "ProximaX"]}
          />

          <ProjectCard
            title="NEM Wallet Pro (Official)"
            company="NEM Foundation"
            description="Alternative wallet for NEM Blockchain with additional features."
            image="/placeholder.svg?height=200&width=400"
            link="https://play.google.com/store/apps/details?id=co.hexdev.nemwallet.v2"
            technologies={["Angular", "Ionic", "NEM"]}
          />
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full border-primary px-6 text-primary hover:bg-primary/10">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  title: string
  company?: string
  description: string
  image: string
  link?: string
  technologies?: string[]
}

function ProjectCard({ title, company, description, image, link, technologies = [] }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-card text-card-foreground">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        {company && <CardDescription className="text-primary">{company}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-gray-300">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-muted px-2 py-1 text-xs text-primary">
                {tech}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      {link && (
        <CardFooter>
          <Button variant="ghost" size="sm" asChild className="gap-1 text-primary hover:bg-primary/10">
            <Link href={link} target="_blank" rel="noopener noreferrer">
              <span>View Project</span>
              <ExternalLink size={16} />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

