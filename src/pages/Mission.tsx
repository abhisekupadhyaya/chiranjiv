import { Card } from '@/components/ui/card'
import {
  MissionHeader,
  WhyWeExist,
  TheProblem,
  ThePlan,
  CorePrinciples,
  TheFutureWeSee,
  JoinTheWave,
} from '@/components/mission'

export default function Mission() {
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
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance font-light">
            Building the future of genomics, one person at a time
          </p>
        </div>

        {/* Mission Content Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <article>
              <MissionHeader
                title="Project Chiranjiv: Our Master Plan"
                subtitle="From India to the world — building the planet's most inclusive genomic platform."
                date="2025"
              />
              <div className="prose-custom">
                <WhyWeExist />
                <TheProblem />
                <ThePlan />
                <CorePrinciples />
                <TheFutureWeSee />
                <JoinTheWave />
              </div>
            </article>
          </Card>
        </div>
      </div>
    </section>
  )
}


