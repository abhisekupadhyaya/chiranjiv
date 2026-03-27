import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">{title}</h3>
    </div>
  )
}

export default function ChiefTechnologyOfficer() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-primary/2 via-secondary/2 to-accent/2 pointer-events-none" />
      
      {/* Floating animated orbs */}
      <div className="fixed top-1/4 left-[60%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0" />
      <div 
        className="fixed bottom-1/4 right-0 w-[50rem] h-[50rem] bg-primary/10 rounded-full blur-[200px] animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }} 
      />

      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-200 mb-4 text-balance leading-[1.1]">
              Chief Technology Officer
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
              Genomics & AI Platform • Leadership
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 sm:p-8 md:p-10 shadow-lg shadow-black/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className="space-y-10">
                {/* Role Overview */}
                <section>
                  <SectionHeader title="Role Overview" />
                  <div className="space-y-4 text-neutral-600 leading-relaxed font-light">
                    <p>
                      The CTO at Chiranjiv will own the entire technology strategy and execution for a
                      genomics-first, AI-driven health platform, serving as a true founding partner to the
                      business and science teams.
                    </p>
                    <p>
                      This is a hands-on architect-leader role built for the AI-native era, where small, elite
                      teams amplified by AI code generation and agentic tooling can outperform traditional
                      engineering organizations.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                      <li>
                        Overall owner of Chiranjiv&apos;s technology vision, architecture, and execution across
                        consumer apps, data platforms, and AI/ML systems.
                      </li>
                      <li>
                        Architects for an AI-augmented development model from day one, selecting and
                        orchestrating AI coding tools to maximize output per engineer while keeping the team
                        deliberately small and senior.
                      </li>
                      <li>
                        Works closely with founders, CSO, and product to build India&apos;s largest genomic
                        reference and wellness platform with secure, scalable technology.
                      </li>
                      <li>Co-founder role can be considered for the right candidate.</li>
                    </ul>
                  </div>
                </section>

                {/* Key Responsibilities */}
                <section>
                  <SectionHeader title="Key Responsibilities" />
                  <div className="space-y-6 text-neutral-600 leading-relaxed font-light">
                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-neutral-200 mb-3">Architecture & Engineering</h4>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                        <li>
                          Define and evolve the end-to-end technical architecture for Chiranjiv&apos;s DNA-to-insights
                          stack: data ingestion, pipelines, APIs, apps, and analytics.
                        </li>
                        <li>
                          Design systems that are AI-development-friendly: modular, well-typed, documented, and
                          structured so AI coding agents can safely generate, test, and deploy code.
                        </li>
                        <li>
                          Own infrastructure choices (cloud, data stores, security, observability), ensuring
                          scalability for millions of users and billions of genetic data points.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-neutral-200 mb-3">
                        AI-Augmented Team & Development Model
                      </h4>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                        <li>
                          Build and lead a deliberately lean, senior engineering team (target: 8-15 engineers)
                          that uses AI code generation to achieve outsized output.
                        </li>
                        <li>
                          Establish the AI-augmented workflow by defining which tasks are AI-generated versus
                          human-authored, and setting review and validation standards for AI-produced code.
                        </li>
                        <li>
                          Build internal tooling and prompt libraries that improve quality and velocity, and
                          continuously evaluate emerging AI development and agentic coding frameworks.
                        </li>
                        <li>
                          Set standards for code quality, security, and reliability where most first-draft code is
                          AI-generated, while human effort focuses on architecture, edge cases, and system-level
                          thinking.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-neutral-200 mb-3">Genomics & AI Product Delivery</h4>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                        <li>
                          Partner with CSO and bioinformatics leaders to productize genomic pipelines and AI models
                          into robust, consumer-facing experiences.
                        </li>
                        <li>
                          Deploy and maintain ML models in production (batch and real-time), integrating
                          recommendation systems, personalization, and predictive models into user-facing products.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-medium text-neutral-200 mb-3">Security, Privacy & Compliance</h4>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                        <li>
                          Establish best practices for data privacy, security, and compliance (encryption, access
                          controls, Indian data residency) across all systems.
                        </li>
                        <li>
                          Implement guardrails for AI-generated code using automated security scanning, dependency
                          auditing, and policy-as-code to prevent vulnerabilities and compliance gaps.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Required Experience */}
                <section>
                  <SectionHeader title="Required Experience & Background" />
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>
                      <strong className="font-semibold text-neutral-200">10-15+ years in software engineering</strong>{' '}
                      with at least 5 years in senior leadership roles (CTO, VP Engineering, Head of Engineering,
                      or equivalent).
                    </li>
                    <li>
                      Proven track record building and scaling complex data-heavy or consumer platforms (healthtech,
                      genomics, fintech, or similar regulated spaces preferred).
                    </li>
                    <li>
                      Must have actively used AI code generation tools in the past six months and shipped
                      AI-assisted code to production in feature-rich codebases.
                    </li>
                    <li>
                      Must have hands-on experience building or contributing to quality control and testing
                      frameworks for AI-generated code, including automated review gates, AI-specific test harnesses,
                      regression suites, or validation pipelines.
                    </li>
                    <li>
                      Candidates should be able to share publicly referenceable details of such projects (open-source
                      repos, published case studies, conference talks, or verifiable employer references).
                    </li>
                    <li>
                      Strong architectural experience across:
                      <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary-600/70">
                        <li>Modern web/mobile stacks (e.g., React/Next.js, native or cross-platform apps).</li>
                        <li>Backend services (Node.js / Python / Go, microservices or well-structured monoliths).</li>
                        <li>Databases and data platforms (relational, NoSQL, data lakes/warehouses).</li>
                      </ul>
                    </li>
                    <li>
                      Demonstrated experience deploying and operating AI/ML models in production:
                      <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary-600/70">
                        <li>Deploying and maintaining ML models in production (batch and real-time).</li>
                        <li>
                          Integrating recommendation systems, personalization, or predictive models into user-facing
                          products.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </section>

                {/* Skills in Bioinformatics / AI Context */}
                <section>
                  <SectionHeader title="Skills in Bioinformatics / AI Context" />
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>
                      Comfortable working with bioinformatics and genomic data teams: understands pipelines
                      conceptually (alignment, variant calling, annotation, QC) and their infrastructure needs, even
                      if not a bioinformatician.
                    </li>
                    <li>
                      Strong understanding of data engineering for large-scale, sensitive data: ETL/ELT, lineage,
                      quality, and governance frameworks.
                    </li>
                    <li>Familiarity with MLOps and experiment pipelines (model versioning, monitoring, A/B testing of AI features).</li>
                    <li>
                      Ability to evaluate where AI/LLM-based approaches can accelerate bioinformatics workflows
                      (variant interpretation, literature synthesis, report generation) and where domain-validated
                      traditional pipelines should remain.
                    </li>
                  </ul>
                </section>

                {/* Leadership & Culture */}
                <section>
                  <SectionHeader title="Leadership & Culture" />
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>
                      Builder-founder mindset: excited to work from 0-1 and 1-N, not just optimize established
                      systems.
                    </li>
                    <li>
                      Thinks in terms of leverage, not headcount. Default instinct is to solve with better tools,
                      automation, and architecture before adding people.
                    </li>
                    <li>
                      Able to attract, hire, and retain top engineering and data talent in an AI-augmented,
                      high-autonomy environment; build a culture of ownership, speed, and scientific rigor.
                    </li>
                    <li>
                      Comfortable interacting with users, partners, and investors to communicate Chiranjiv&apos;s
                      technology and data advantage.
                    </li>
                    <li>
                      Intellectually curious about rapidly evolving AI tooling and treats staying current as a core
                      part of the role.
                    </li>
                  </ul>
                </section>

                {/* What We Offer */}
                <section>
                  <SectionHeader title="What Chiranjiv Offers" />
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>
                      Chance to architect and build India&apos;s genomic and longevity infrastructure from the ground
                      up, with direct impact on how millions of Indians understand their health.
                    </li>
                    <li>
                      Close partnership with founders and CSO in a mission-driven environment focused on long-term
                      wellness, not short-term engagement hacks.
                    </li>
                    <li>
                      An AI-native engineering culture from day one: the freedom and expectation to use the best
                      available tools and build quickly with a small team that punches above its weight.
                    </li>
                  </ul>
                </section>

                {/* CTA */}
                <div className="pt-8 border-t border-neutral-1000/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/careers" className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors">
                    ← Back to Roles
                  </Link>
                  <Button asChild className="bg-primary-600 text-white hover:bg-primary-600/90 w-full sm:w-auto px-8">
                    <a href="mailto:careers@chiranjiv.com?subject=Application for Chief Technology Officer Role">
                      Apply: careers@chiranjiv.com
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
