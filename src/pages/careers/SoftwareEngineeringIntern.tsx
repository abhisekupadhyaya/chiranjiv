import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function SoftwareEngineeringIntern() {
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
              Software Engineering Intern
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
              Full Stack / AI
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
                      About The Role
                    </h3>
                  </div>
                  <div className="space-y-4 text-neutral-600 leading-relaxed font-light">
                    <p>
                      Fresh CS graduate or Final-year Computer Science (or equivalent) students, available for at least 6 months (part-time or full-time).
                    </p>
                    <p>
                      Work on real features for Chiranjiv's genomics and personalized health platform, not isolated "intern tasks".
                    </p>
                  </div>
                </section>

                {/* Responsibilities */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Responsibilities
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>Contribute to frontend and/or backend features for the Chiranjiv web platform and internal tools.</li>
                    <li>Assist in integrating data and AI workflows into the product.</li>
                    <li>Write clean, tested code; participate in code reviews; document what you build.</li>
                    <li>Work closely with founding team to iterate on features based on user feedback and product priorities.</li>
                  </ul>
                </section>

                {/* Requirements */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Requirements
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li>Currently in 4th year of a Computer Science / CSE / IT degree program.</li>
                    <li>Able to commit at least 6 months, with 20–40 hours/week (part-time or full-time internship).</li>
                    <li>
                      Comfortable with:
                      <ul className="list-circle pl-5 mt-2 space-y-1">
                        <li>Web frontend (e.g., React/Next.js, HTML/CSS/JS)</li>
                        <li>Backend (Node.js/Python, REST APIs, databases)</li>
                      </ul>
                    </li>
                    <li>Strong fundamentals in data structures, algorithms, and basic software engineering practices (Git, debugging, testing).</li>
                    <li>Interest in healthtech, genomics, or AI-driven products is a plus.</li>
                  </ul>
                </section>

                {/* Structure & Benefits */}
                <section>
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-primary-600/50 to-transparent" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4">
                      Internship Structure & Benefits
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-3 text-neutral-600 leading-relaxed font-light marker:text-primary-600/70">
                    <li><strong className="font-semibold text-neutral-200">Duration:</strong> 6+ months; flexible start date; part-time or full-time depending on college schedule.</li>
                    <li><strong className="font-semibold text-neutral-200">Stipend:</strong> modest basic stipend to cover expenses.</li>
                    <li><strong className="font-semibold text-neutral-200">Career Path:</strong> Possibility of full time role later on based on performance.</li>
                    <li><strong className="font-semibold text-neutral-200">Learning:</strong> Direct mentorship from founding engineers and product team. Exposure to production systems in genomics, health data, and AI.</li>
                  </ul>
                </section>

                {/* CTA */}
                <div className="pt-8 border-t border-neutral-1000/30 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Link to="/careers" className="text-sm font-medium text-neutral-500 hover:text-neutral-200 transition-colors">
                    ← Back to Roles
                  </Link>
                  <Button asChild className="bg-primary-600 text-white hover:bg-primary-600/90 w-full sm:w-auto px-8">
                    <a href="mailto:careers@chiranjiv.com?subject=Application for Software Engineering Intern Role">
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
