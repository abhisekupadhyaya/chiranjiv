import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function FoundingEngineer() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 mb-5 sm:mb-7">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
            <span className="text-[11px] sm:text-xs font-light text-muted-foreground tracking-wide">
              We Are Hiring
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Founding Engineer
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Full Stack with AI • Bangalore / Remote
          </p>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-10">
              {/* Role Overview */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    What a Founding Engineer Means
                  </h3>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
                  <p>
                    Chiranjiv is hiring Founding Engineers to own our full-stack and AI architecture, and help build India's genomic and preventive health infrastructure from the ground up.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 marker:text-primary/70">
                    <li><strong className="font-semibold text-foreground">Part of the core founding team:</strong> involved in product, architecture, and early culture.</li>
                    <li><strong className="font-semibold text-foreground">Owns 0→1 and 1→N:</strong> ships MVPs fast, sets standards (code quality, reviews, infra), and later helps build the engineering team.</li>
                    <li><strong className="font-semibold text-foreground">Acts like a co-founder without the formal title:</strong> helps with customer calls, deep-dives with clinicians, and strategic product decisions.</li>
                  </ul>
                </div>
              </section>

              {/* Responsibilities */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Responsibilities (Healthtech + AI Focus)
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li>Architect and build core products: consumer dashboards, clinician views, internal tools for genomic and health data, analytics pipeline and AI platform.</li>
                  <li>Design and maintain backend services, APIs, and data models that can handle sensitive health and genomic data securely.</li>
                  <li>Integrate and productionize AI features (risk scores, recommendations, personalization, triage, etc.) with real-world clinical constraints.</li>
                  <li>Set up and own DevOps: CI/CD, observability, infrastructure-as-code, and basic MLOps where needed.</li>
                  <li>Collaborate directly with founders and medical experts to refine roadmap, run experiments, and iterate quickly based on user feedback.</li>
                </ul>
              </section>

              {/* Skills & Profile */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Skills & Profile
                  </h3>
                </div>
                <ul className="list-disc pl-5 space-y-3 text-muted-foreground leading-relaxed font-light marker:text-primary/70">
                  <li><strong className="font-semibold text-foreground">3–7 years as a strong generalist engineer:</strong> solid full stack (React/Next + Node/Python + relational/No SQL DB) and comfort with cloud (AWS).</li>
                  <li><strong className="font-semibold text-foreground">Practical ML/AI exposure:</strong> either built models in Python or shipped features using LLM/ML APIs; understands data → model → API → UI flow.</li>
                  <li><strong className="font-semibold text-foreground">Bonus:</strong> previous healthtech/genomics experience, or strong interest in preventive health, longevity, and evidence-based medicine.</li>
                </ul>
              </section>

              {/* Compensation */}
              <section>
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-light text-foreground mb-4">
                    Compensation
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed font-light">
                  This is a light-cash role with meaningful equity aligned with core-team status.
                </p>
              </section>

              {/* CTA */}
              <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link to="/careers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to Roles
                </Link>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow w-full sm:w-auto px-8">
                  <a href="mailto:careers@chiranjiv.com?subject=Application for Founding Engineer Role">
                    Apply: careers@chiranjiv.com
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
