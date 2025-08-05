import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Experience() {
  return (
    <section id="experience" className="bg-background py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">Work Experience</h2>

        <div className="space-y-6">
          <ExperienceCard
            title="Freelance Software Engineer"
            company="Self-employed"
            period="Present"
            description="Working on various client projects as a full-stack developer, delivering custom solutions and technical expertise."
          />

          <ExperienceCard
            title="Full Stack Developer"
            company="Workbeaver (UK)"
            period="Sep 2024 - Jan 2025"
            description={[
              "Architected and deployed a secure identity service provider using Node.js and DynamoDB, reducing authentication latency by 40% and supporting 10K+ concurrent users.",
              "Designed and implemented OAuth 2.0/OIDC authentication system with multi-factor authentication, achieving 99.9% uptime.",
              "Implemented comprehensive monitoring with AWS CloudWatch and automated alerting, reducing incident response time by 60%.",
            ]}
          />

          <ExperienceCard
            title="Co-Founder / CTO"
            company="Safe Technology Ventures (Singapore)"
            period="Jul 2023 - May 2024"
            description={[
              "Led technical strategy and development of a full-stack dispute management platform, processing $2M+ in transaction volume with 95% automated resolution rate.",
              "Architected scalable microservices platform with Node.js, Next.js, and PostgreSQL, reducing dispute resolution time from 14 days to 2 hours.",
              "Established engineering practices and CI/CD pipelines, enabling daily deployments with zero downtime.",
            ]}
          />

          <ExperienceCard
            title="CTO / Blockchain Consultant"
            company="Tradeshare LLC (USA)"
            period="Dec 2020 - Dec 2021"
            description={[
              "Developed scalable backend services for a global trading platform using Node.js and PostgreSQL.",
              "Integrated third-party financial APIs to enhance real-time data exchange and transaction accuracy.",
            ]}
          />

          <ExperienceCard
            title="Blockchain Full Stack Developer"
            company="ProximaX LLC (Singapore)"
            period="Apr 2019 - Dec 2020"
            description={[
              "Developed decentralized applications (dApps) using Node.js and blockchain technologies.",
              "Focused on smart contract integration and optimizing system performance within the blockchain ecosystem.",
            ]}
          />

          <ExperienceCard
            title="Blockchain Full Stack Developer"
            company="NEM Foundation (Australia)"
            period="Dec 2018 - Apr 2019"
            description={[
              "Maintained blockchain-based applications and developed secure APIs for decentralized networks.",
              "Worked on smart contract development and improved developer tools for the NEM blockchain.",
            ]}
          />
        </div>
      </div>
    </section>
  )
}

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string | string[]
}

function ExperienceCard({ title, company, period, description }: ExperienceCardProps) {
  return (
    <Card className="bg-card text-card-foreground">
      <CardHeader className="pb-2">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-base text-primary">{company}</CardDescription>
          </div>
          <div className="text-sm font-medium text-gray-400">{period}</div>
        </div>
      </CardHeader>
      <CardContent className="text-gray-300">
        {typeof description === "string" ? (
          <p>{description}</p>
        ) : (
          <ul className="ml-5 list-disc space-y-1">
            {description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

