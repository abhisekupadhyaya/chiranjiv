import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'

export default function Careers() {
  const roles = [
    {
      slug: 'founding-engineer',
      title: 'Founding Engineer (Full Stack with AI)',
      type: 'Full-time • 3-7 Years Experience',
      excerpt:
        'Own our full-stack and AI architecture, and help build India’s genomic and preventive health infrastructure from the ground up.',
    },
    {
      slug: 'software-engineering-intern',
      title: 'Software Engineering Intern (Full Stack / AI)',
      type: 'Internship • 6+ Months',
      excerpt:
        'Work on real features for Chiranjiv’s genomics and personalized health platform. Open to fresh CS graduates or final-year students.',
    },
    {
      slug: 'chief-scientific-officer',
      title: 'Chief Scientific Officer',
      type: 'Leadership • 15+ Years Experience',
      excerpt:
        'Lead the scientific, bioinformatics, and AI strategy for large-scale Indian genomics. Co-founder role considered for the right candidate.',
    },
    {
      slug: 'chief-technology-officer',
      title: 'Chief Technology Officer',
      type: 'Leadership • 10-15+ Years Experience',
      excerpt:
        'Own the entire technology strategy and execution for a genomics-first, AI-driven health platform. Co-founder role considered.',
    },
  ]

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
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-200 mb-4 text-balance leading-[1.1]">
              Join Our Mission
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 text-pretty leading-relaxed font-light max-w-2xl mx-auto">
              Build the future of genomics and personalized health in India
            </p>
          </div>

          {/* Roles List */}
          <div className="flex flex-wrap gap-6 max-w-7xl mx-auto">
            {roles.map((role) => (
              <Link key={role.slug} to={`/careers/${role.slug}`} className="group block w-full md:w-[calc(50%-0.75rem)]">
                <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-8 sm:p-10 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 h-full">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50" />
                  
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 mb-4 font-light">
                    <span className="font-medium text-primary-600">{role.type}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-neutral-200 mb-4 group-hover:text-primary-600 transition-colors text-balance leading-tight tracking-tight">
                    {role.title}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 mb-6 leading-relaxed font-light">{role.excerpt}</p>
                  <div className="text-sm font-medium text-primary-600 flex items-center gap-1">
                    View Role <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
