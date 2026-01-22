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

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 mb-5 sm:mb-7">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
            <span className="text-[11px] sm:text-xs font-light text-muted-foreground tracking-wide">
              We Are Hiring
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Join Our Mission
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-2xl mx-auto">
            Build the future of genomics and personalized health in India
          </p>
        </div>

        {/* Roles List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {roles.map((role) => (
            <Link key={role.slug} to={`/careers/${role.slug}`} className="group block">
              <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:scale-[1.01] hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground mb-4 font-light">
                  <span className="font-medium text-primary">{role.type}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-4 group-hover:text-primary transition-colors text-balance leading-tight tracking-tight">
                  {role.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed font-light">{role.excerpt}</p>
                <div className="text-sm font-medium text-primary flex items-center gap-1">
                  View Role <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
