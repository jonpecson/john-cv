"use client";

import * as TechIcons from "@/components/tech-icons";

import { Layers, Layout } from "lucide-react";

import { Counter } from "@/components/counter";
import { ExperienceCard } from "@/components/experience-card";
import { ProfileCard } from "@/components/profile-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillCard } from "@/components/skill-card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-glow lg:flex-row">
      {/* Left column - Fixed */}
      <div className="w-full p-6 lg:sticky lg:top-0 lg:h-screen lg:w-5/12 lg:overflow-y-auto lg:p-12">
        <div className="mx-auto max-w-md">
          <ProfileCard />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8">
            <h1 className="mb-2 text-5xl font-bold text-white md:text-6xl">
              SOFTWARE
            </h1>
            <h1 className="mb-6 text-5xl font-bold text-gray-400 md:text-6xl">
              ENGINEER
            </h1>

            <p className="mb-8 text-cv-light-gray">
              Passionate about creating intuitive and engaging user experiences.
              Specialize in transforming ideas into beautifully crafted
              products.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <Counter
                end={8}
                prefix="+"
                title="YEARS OF"
                subtitle="EXPERIENCE"
                delay={0.4}
              />
              <Counter
                end={46}
                prefix="+"
                title="PROJECTS"
                subtitle="COMPLETED"
                delay={0.6}
              />
              <Counter
                end={20}
                prefix="+"
                title="WORLDWIDE"
                subtitle="CLIENTS"
                delay={0.8}
              />
            </div>
          </motion.div>

          {/* Skill Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6">
            <SkillCard
              title="FULL STACK"
              subtitle="DEVELOPER"
              color="orange"
              icon={<Layers className="h-8 w-8 text-white" />}
              delay={1.0}
            />
            <SkillCard
              title="MOBILE & WEB"
              subtitle="APPLICATIONS"
              color="neon"
              icon={<Layout className="h-8 w-8 text-cv-dark" />}
              delay={1.2}
            />
          </div>
        </div>
      </div>

      {/* Right column - Scrollable */}
      <div className="w-full p-6 lg:w-7/12 lg:overflow-y-auto lg:p-12">
        <div className="mx-auto max-w-3xl">
          {/* Recent Projects Section */}
          <section className="mb-16">
            <SectionTitle
              title="Recent Projects"
              delay={0.2}
            />

            <div className="grid grid-cols-1 gap-6">
              <ProjectCard
                title="Workbeaver Website / Authentication API"
                description="Developed a website for WorkBeaver, featuring an intuitive interface for automating repetitive tasks. Implemented a backend API to manage authentication and authorization."
                image="https://ik.imagekit.io/onefestival/cv/work-beaver.png?tr=w-800"
                technologies={["NextJS", "React", "NodeJS"]}
                delay={0.3}
                link="https://workbeaver.com/"
              />

              <ProjectCard
                title="Safe - Midman App"
                description="Secure platform to protect users from fraud risks. Built with modern technologies to ensure security and performance."
                image="https://ik.imagekit.io/onefestival/cv/safe-midman.png??tr=w-800"
                technologies={["React", "NodeJS", "AWS"]}
                delay={0.4}
                link="https://www.linkedin.com/posts/earonvillamora_ang-midman-app-ng-bayan-safe-wins-best-activity-7105158092476096512-coPe/?trk=public_profile_like_view"
              />

              <ProjectCard
                title="One Festival App"
                description="Comprehensive app for festival-goers with maps, line-up info, and real-time updates. Available on both iOS and Android platforms."
                image="https://ik.imagekit.io/onefestival/cv/one-festival-website.png??tr=w-800"
                technologies={["ReactNative", "NodeJS"]}
                link="https://onefestival.framer.website/"
                delay={0.5}
              />
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="mb-16">
            <SectionTitle
              title="Work Experience"
              delay={0.6}
            />

            <div className="space-y-6">
              <ExperienceCard
                title="Freelance Software Engineer"
                company="Self-employed"
                period="Present"
                description="Working on various client projects as a full-stack developer, delivering custom solutions and technical expertise."
                technologies={["React", "NextJS", "NodeJS", "AWS"]}
                delay={0.7}
              />

              <ExperienceCard
                title="Full Stack Developer"
                company="Workbeaver (UK)"
                period="Sep 2024 - Jan 2025"
                description={[
                  "Developed an identity service provider using Node.js, Docker, and Amazon DynamoDB.",
                  "Designed and implemented a secure authentication system, ensuring seamless user access.",
                  "Leveraged AWS CloudWatch for real-time monitoring and system optimization.",
                ]}
                technologies={["NodeJS", "AWS", "React"]}
                delay={0.8}
              />

              <ExperienceCard
                title="Co-Founder / CTO"
                company="Safe Technology Ventures (Singapore)"
                period="Jul 2023 - May 2024"
                description={[
                  "Led the development of a full-stack dispute management system for secure e-commerce transactions.",
                  "Built a scalable platform with Node.js, Next.js, and PostgreSQL, streamlining dispute resolution.",
                ]}
                technologies={["NextJS", "NodeJS", "Database"]}
                delay={0.9}
              />

              <ExperienceCard
                title="CTO / Blockchain Consultant"
                company="Tradeshare LLC (USA)"
                period="Dec 2020 - Dec 2021"
                description={[
                  "Developed scalable backend services for a global trading platform using Node.js and PostgreSQL.",
                  "Integrated third-party financial APIs to enhance real-time data exchange and transaction accuracy.",
                ]}
                technologies={["NodeJS", "Database", "Backend"]}
                delay={1.0}
              />
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <SectionTitle
              title="Technical Skills"
              delay={1.1}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.React className="h-4 w-4" />
                    <span>React</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.NextJS className="h-4 w-4" />
                    <span>Next.js</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Web className="h-4 w-4" />
                    <span>HTML/CSS</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>Tailwind CSS</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.NodeJS className="h-4 w-4" />
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Backend className="h-4 w-4" />
                    <span>Express</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>MongoDB</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>PostgreSQL</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Mobile</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.ReactNative className="h-4 w-4" />
                    <span>React Native</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Mobile className="h-4 w-4" />
                    <span>Ionic</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Mobile className="h-4 w-4" />
                    <span>Expo</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">
                  DevOps & Cloud
                </h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.AWS className="h-4 w-4" />
                    <span>AWS</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Cloud className="h-4 w-4" />
                    <span>Docker</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Cloud className="h-4 w-4" />
                    <span>CI/CD</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Cloud className="h-4 w-4" />
                    <span>Vercel</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-16">
            <SectionTitle
              title="Get In Touch"
              delay={1.6}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="rounded-xl glass-card p-6">
              <p className="mb-6 text-cv-light-gray">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cv-orange/80 backdrop-blur-sm p-2">
                    <TechIcons.Web className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Website</p>
                    <a
                      href="https://johnpecson.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cv-orange hover:underline">
                      johnpecson.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cv-orange/80 backdrop-blur-sm p-2">
                    <TechIcons.Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <a
                      href="mailto:jonpecson.io@gmail.com"
                      className="text-cv-orange hover:underline">
                      jonpecson.io@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-cv-orange/80 backdrop-blur-sm p-2">
                    <TechIcons.MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-cv-light-gray">
                      Talisay City, Negros Occidental, Philippines
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="pb-8 pt-8 text-center text-cv-light-gray">
            <p>
              © {new Date().getFullYear()} John Anthony Pecson. All rights
              reserved.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
