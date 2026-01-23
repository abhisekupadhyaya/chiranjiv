import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function FoundingEngineer() {
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
              Founding Engineer
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
              Full Stack with AI
            </p>
          </div>

          {/* Content Card */}
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/50 p-6 sm:p-8 md:p-10 shadow-lg shadow-black/5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
              
              <div className="space-y-10">
                {/* Role Overview */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      What a Founding Engineer Means
                    </h3>
                  </div>
                  <div className="space-y-4 text-neutral-600 leading-relaxed font-light">
                    <p>
                      Chiranjiv is hiring Founding Engineers to own our full-stack and AI architecture, and help build India's genomic and preventive health infrastructure from the ground up.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-primary-600/70">
                      <li><strong className="font-semibold text-neutral-200">Part of the core founding team:</strong> involved in product, architecture, and early culture.</li>
                      <li><strong className="font-semibold text-neutral-200">Owns 0→1 and 1→N:</strong> ships MVPs fast, sets standards (code quality, reviews, infra), and later helps build the engineering team.</li>
                      <li><strong className="font-semibold text-neutral-200">Acts like a co-founder without the formal title:</strong> helps with customer calls, deep-dives with clinicians, and strategic product decisions.</li>
                    </ul>
                  </div>
                </section>

                {/* Responsibilities */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Responsibilities (Healthtech + AI Focus)
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
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
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Skills & Profile
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li><strong className="font-semibold text-neutral-200">3–7 years as a strong generalist engineer:</strong> solid full stack (React/Next + Node/Python + relational/No SQL DB) and comfort with cloud (AWS).</li>
                    <li><strong className="font-semibold text-neutral-200">Practical ML/AI exposure:</strong> either built models in Python or shipped features using LLM/ML APIs; understands data → model → API → UI flow.</li>
                    <li><strong className="font-semibold text-neutral-200">Bonus:</strong> previous healthtech/genomics experience, or strong interest in preventive health, longevity, and evidence-based medicine.</li>
                  </ul>
                </section>

                {/* Compensation */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Compensation
                    </h3>
                  </div>
                  <p className="text-base text-neutral-600 leading-relaxed font-light">
                    This is a light-cash role with meaningful equity aligned with core-team status.
                  </p>
                </section>

                {/* CTA */}
                <div className="pt-8 border-t border-neutral-1000/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/careers" className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors">
                    ← Back to Roles
                  </Link>
                  <Button asChild className="bg-primary-600 text-white hover:bg-primary-600/90 w-full sm:w-auto px-8">
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
    </main>
  )
}
