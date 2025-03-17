import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  return (
    <section id="skills" className="bg-background py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Skills & Technologies</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">Front-End</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary px-3 py-1 text-white">React</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">Next.js</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">Angular</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">JavaScript</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">TypeScript</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">HTML5</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">CSS3</Badge>
                <Badge className="bg-primary px-3 py-1 text-white">Tailwind CSS</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">Back-End</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-600 px-3 py-1 text-white">Node.js</Badge>
                <Badge className="bg-green-600 px-3 py-1 text-white">Express</Badge>
                <Badge className="bg-green-600 px-3 py-1 text-white">RESTful APIs</Badge>
                <Badge className="bg-green-600 px-3 py-1 text-white">GraphQL</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">Mobile Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-600 px-3 py-1 text-white">Ionic</Badge>
                <Badge className="bg-purple-600 px-3 py-1 text-white">React Native</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">Databases</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-yellow-600 px-3 py-1 text-white">MongoDB</Badge>
                <Badge className="bg-yellow-600 px-3 py-1 text-white">PostgreSQL</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-red-600 px-3 py-1 text-white">Docker</Badge>
                <Badge className="bg-red-600 px-3 py-1 text-white">Git</Badge>
                <Badge className="bg-red-600 px-3 py-1 text-white">CI/CD</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground">
            <CardContent className="p-6">
              <h3 className="mb-4 text-xl font-semibold text-primary">Cloud Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-orange-600 px-3 py-1 text-white">AWS</Badge>
                <Badge className="bg-orange-600 px-3 py-1 text-white">Digital Ocean</Badge>
                <Badge className="bg-orange-600 px-3 py-1 text-white">Vercel</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

