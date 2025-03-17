import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="relative overflow-hidden px-4 py-12 md:py-16" style={{ backgroundColor: "#f7f6f3" }}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div
              className="relative mb-6 h-24 w-24 overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(0, 153, 255, 0.2)" }}
            >
              <Image
                src="https://ik.imagekit.io/onefestival/general/profile-photo.png?updatedAt=1742221494292"
                alt="John's profile picture"
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            </div>

            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Hello, my name is John</h1>

            <div className="space-y-6 text-base md:text-lg">
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

              <div className="pt-4">
                <Button
                  className="rounded-full px-6 text-white hover:bg-black/90"
                  style={{ backgroundColor: "#000000" }}
                >
                  Explore My Work
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute right-0 top-0 -z-10 h-80 w-80 translate-x-1/4 -translate-y-1/4">
        <div
          className="absolute h-40 w-40 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.2)" }}
        ></div>
        <div
          className="absolute left-8 top-8 h-40 w-40 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.4)" }}
        ></div>
        <div
          className="absolute left-16 top-16 h-40 w-40 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.6)" }}
        ></div>
        <div
          className="absolute left-24 top-24 h-40 w-40 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.8)" }}
        ></div>
      </div>

      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 translate-x-1/3 translate-y-1/3">
        <div
          className="absolute h-48 w-48 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.2)" }}
        ></div>
        <div
          className="absolute left-8 top-8 h-48 w-48 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.4)" }}
        ></div>
        <div
          className="absolute left-16 top-16 h-48 w-48 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.6)" }}
        ></div>
        <div
          className="absolute left-24 top-24 h-48 w-48 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(0, 153, 255, 0.8)" }}
        ></div>
        <div
          className="absolute left-32 top-32 h-48 w-48 rounded-full blur-xl"
          style={{ backgroundColor: "rgba(138, 43, 226, 0.4)" }}
        ></div>
      </div>
    </header>
  )
}

