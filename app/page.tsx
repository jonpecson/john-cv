"use client";

import * as TechIcons from "@/components/tech-icons";

import { Layers, Layout } from "lucide-react";

import { Counter } from "@/components/counter";
import { DownloadCVCard } from "@/components/download-cv-card";
import { ExperienceCard } from "@/components/experience-card";
import { ProfileCard } from "@/components/profile-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { SkillCard } from "@/components/skill-card";
import { BlogSection } from "@/components/blog-section";
import { motion } from "framer-motion";
import { getBlogPosts } from "@/lib/blog";
import { BlogPost } from "@/types/blog";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
            <DownloadCVCard
              title="Let's Work Together!"
              subtitle="View My CV"
              link="https://docs.google.com/document/d/1N2Xifdfg5L1C_mr51tGv-72vC6tP2YWV/edit?usp=sharing&ouid=105709968836095098027&rtpof=true&sd=true"
              color="orange"
              icon={<Layout className="h-8 w-8 text-white" />}
              delay={1.2}
            />
          </div>
        </div>
      </div>

      {/* Right column - Scrollable */}
      <div className="w-full p-6 lg:w-7/12 lg:overflow-y-auto lg:p-12">
        <div className="mx-auto max-w-3xl">
          {/* Blog Section */}
          {!isLoading && (
            <BlogSection posts={blogPosts} delay={0.1} />
          )}
          {isLoading && (
            <div className="text-white p-4">Loading blog posts...</div>
          )}
          {!isLoading && blogPosts.length === 0 && (
            <div className="text-white p-4">No blog posts found.</div>
          )}

          {/* Recent Projects Section */}
          <section className="mb-16">
            <SectionTitle
              title="Recent Projects"
              delay={0.5}
            />

            <div className="grid grid-cols-1 gap-6">
              <ProjectCard
                title="Empire Crypto Trading Platform"
                description="Rebuilt the social trading platform for crypto enthusiasts with real-time market feeds, community discussions, and portfolio sharing. Architected to handle 50K+ monthly active traders with WebSocket-powered live updates and secure JWT authentication. Enhanced engagement by 3x through optimized UI/UX and performance."
                image="/images/empire.webp"
                technologies={[
                  "Next.js",
                  "NestJS",
                  "WebSockets",
                  "AWS (ECS, CloudFront)",
                  "PostgreSQL",
                  "Docker",
                ]}
                delay={0.6}
                link="https://empirecryptotrading.com/"
              />
              <ProjectCard
                title="Official Blockchain Wallet Applications"
                description="Developed official wallet applications for both NEM and ProximaX blockchain ecosystems. Built cross-platform mobile wallets enabling users to manage digital assets, send/receive tokens, and interact with blockchain networks. Implemented secure key management and transaction signing."
                image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop"
                technologies={["Ionic", "Angular", "TypeScript", "NEM SDK", "ProximaX SDK", "Cordova"]}
                delay={0.7}
              />

              <ProjectCard
                title="ProximaX Blockchain Network Deployment"
                description="Led the deployment and configuration of ProximaX blockchain network infrastructure. Set up validator nodes, configured network parameters, and established monitoring systems. Ensured network stability and performance across distributed node infrastructure."
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
                technologies={["Linux", "Docker", "Blockchain", "Node Configuration", "Network Monitoring"]}
                delay={0.8}
              />

              <ProjectCard
                title="Core Banking System & eWallet (Panama)"
                description="Built a core banking system and eWallet platform for a Panama-based financial institution. Implemented secure transaction processing, multi-currency support, and compliance features. Developed RESTful APIs for seamless integration with third-party payment systems."
                image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop"
                technologies={["Angular", "Node.js", "PostgreSQL", "Docker", "REST APIs"]}
                delay={0.9}
              />
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="mb-16">
            <SectionTitle
              title="Work Experience"
              delay={1.0}
            />

            <div className="space-y-6">
              <ExperienceCard
                title="Lead Software Engineer"
                company="Empire Crypto Trading (Remote)"
                period="Feb 2025 - Present"
                description={[
                  "Rebuilt social trading platform for crypto traders using Next.js/NestJS, increasing user engagement by 3x",
                  "Architected real-time features including live market feeds, chat, and portfolio sharing using WebSockets",
                  "Optimized AWS infrastructure (ECS, CloudFront) to handle 50K+ monthly active traders",
                  "Implemented JWT authentication and rate limiting for enhanced security",
                ]}
                technologies={[
                  "Next.js",
                  "NestJS",
                  "WebSockets",
                  "AWS (ECS, Lambda, CloudFront)",
                  "PostgreSQL",
                  "Docker",
                ]}
                delay={1.1}
              />

              <ExperienceCard
                title="Lead Software Engineer"
                company="Safe Technology Ventures (Singapore)"
                period="Jul 2023 - May 2024"
                description={[
                  "Architected a secure dispute resolution platform for e-commerce transactions, enhancing user trust and safety",
                  "Implemented a microservices architecture using Node.js and Next.js, ensuring scalability and maintainability",
                  "Integrated advanced security features, including end-to-end encryption and multi-factor authentication",
                  "Led a team of developers in building a robust API for seamless integration with e-commerce platforms",
                  "Utilized AWS services for cloud infrastructure, ensuring high availability and disaster recovery",
                ]}
                technologies={[
                  "Next.js",
                  "Node.js",
                  "PostgreSQL",
                  "AWS",
                  "Docker",
                ]}
                delay={1.2}
              />

              <ExperienceCard
                title="Software Engineer"
                company="Tradeshare LLC (USA) | Decentralized Lending Platform (DeFi)"
                period="Dec 2020 - Dec 2021"
                description={[
                  "Designed smart contracts (Solidity) for collateralized loans, interest rate models, and liquidation mechanisms, reducing bad debt by 90% vs. industry averages",
                  "Developed a React-based frontend with Web3.js for seamless user interaction with the blockchain",
                  "Implemented a secure wallet integration for user transactions, enhancing security and user experience",
                  "Created a real-time analytics dashboard for monitoring loan performance and user activity",
                ]}
                technologies={["React", "Node.js", "Solidity", "Web3.js", "Ethers.js"]}
                delay={1.3}
              />

              <ExperienceCard
                title="Software Engineer"
                company="ProximaX LLC (Remote)"
                period="Apr 2019 - Dec 2020"
                description={[
                  "Developed blockchain-based applications on the ProximaX Sirius platform",
                  "Built cross-platform wallet applications using Ionic and Angular",
                  "Deployed and maintained blockchain network nodes and infrastructure",
                  "Created SDKs and developer tools for the ProximaX ecosystem",
                ]}
                technologies={["Angular", "Ionic", "TypeScript", "Blockchain", "Docker", "Linux"]}
                delay={1.4}
              />

              <ExperienceCard
                title="Software Engineer"
                company="NEM Foundation (Remote)"
                period="Dec 2018 - Apr 2019"
                description={[
                  "Built official NEM blockchain wallet and explorer applications",
                  "Developed frontend interfaces for blockchain interaction using Angular",
                  "Contributed to NEM ecosystem tools and documentation",
                ]}
                technologies={["Angular", "TypeScript", "NEM SDK", "Blockchain"]}
                delay={1.5}
              />

              <ExperienceCard
                title="Software Engineer"
                company="Hybrain (Philippines)"
                period="Nov 2017 - Aug 2018"
                description={[
                  "Built a core banking system and eWallet platform for a Panama-based financial institution",
                  "Developed RESTful APIs for secure transaction processing and multi-currency support",
                  "Implemented compliance features and third-party payment system integrations",
                ]}
                technologies={["Angular", "Node.js", "PostgreSQL", "Docker", "REST APIs"]}
                delay={1.6}
              />
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-16">
            <SectionTitle
              title="Technical Skills"
              delay={1.7}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
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
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Web className="h-4 w-4" />
                    <span>Web3 Frontend</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.9 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.NodeJS className="h-4 w-4" />
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Backend className="h-4 w-4" />
                    <span>NestJS</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Backend className="h-4 w-4" />
                    <span>Express</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Web className="h-4 w-4" />
                    <span>WebSocket</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.0 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Blockchain</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>Solidity</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Web className="h-4 w-4" />
                    <span>Ethereum</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>Web3.js</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Frontend className="h-4 w-4" />
                    <span>Ethers.js</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.1 }}
                className="rounded-xl glass-card p-6">
                <h3 className="mb-4 text-xl font-bold text-white">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>PostgreSQL</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>MongoDB</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>DynamoDB</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full glass px-3 py-1 text-sm text-white">
                    <TechIcons.Database className="h-4 w-4" />
                    <span>Redis</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="rounded-xl glass-card p-6 sm:col-span-2">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Cloud & DevOps
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
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-16">
            <SectionTitle
              title="Get In Touch"
              delay={2.3}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.4 }}
              className="rounded-xl glass-card p-6">
              <p className="mb-6 text-cv-light-gray">
                Ready to discuss your next project? Let's build something exceptional together.
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
                      Philippines
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
