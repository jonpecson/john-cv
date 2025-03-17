import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Globe } from "lucide-react"
import Link from "next/link"

export function About() {
  return (
    <section id="about" className="bg-secondary py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">About Me</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary md:text-2xl">Professional Profile</h3>
            <div className="space-y-4 text-gray-300">
              <p>
                As a dynamic problem solver, I thrive on challenges and enjoy finding creative solutions to complex
                problems. With a passion for technology and a deep understanding of programming concepts, I am
                constantly tinkering with code to improve my skills and stay up-to-date with the latest industry trends.
              </p>

              <p>
                At the same time, I understand the importance of balancing functionality with aesthetics. I have a keen
                eye for design and always strive to ensure that my code not only functions flawlessly, but also looks
                great. Whether I'm working on a front-end or back-end project, I pay close attention to every detail to
                ensure that the final product meets both functional and aesthetic requirements.
              </p>

              <p>
                With a strong work ethic and an eagerness to learn, I am always looking for new challenges and
                opportunities to expand my skill set. I am confident that my combination of problem-solving abilities
                and design skills make me a valuable asset to any development team.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-primary md:text-2xl">Personal Details</h3>
            <Card className="bg-card text-card-foreground">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">Location:</span>
                    <span>Talisay City, Negros Occidental, Philippines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold text-primary">Email:</span>
                    <a href="mailto:jonpecson.io@gmail.com" className="text-primary hover:underline">
                      jonpecson.io@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-semibold text-primary">Connect:</span>
                    <div className="flex gap-2">
                      <Link
                        href="https://github.com/jonpecson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white"
                      >
                        <Github size={20} />
                      </Link>
                      <Link
                        href="https://www.linkedin.com/in/jonpecson"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-primary"
                      >
                        <Linkedin size={20} />
                      </Link>
                      <Link
                        href="https://johnpecson.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-green-400"
                      >
                        <Globe size={20} />
                      </Link>
                    </div>
                  </li>
                </ul>

                <div className="mt-6">
                  <h4 className="mb-3 font-semibold text-primary">Education</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>Bachelor of Science in Computer Science</li>
                    <li>Computer Programming NC IV</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

