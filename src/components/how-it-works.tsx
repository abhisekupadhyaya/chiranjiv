import { Card } from '@/components/ui/card'
import { UserPlus, Package, BarChart3 } from 'lucide-react'

const steps = [
  { number: '01', title: 'Join the Waitlist', description: 'Sign up now to secure your spot. Refer friends to climb the ranks and get early access.', icon: (
    <UserPlus className="w-8 h-8" />
  )},
  { number: '02', title: 'Receive Your Kit', description: 'Get your free at-home DNA collection kit delivered when you reach the top spots in Q1 2026.', icon: (
    <Package className="w-8 h-8" />
  )},
  { number: '03', title: 'Get Your Results', description: 'Access your comprehensive reports and personalized recommendations through the app.', icon: (
    <BarChart3 className="w-8 h-8" />
  )},
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How It Works</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">Three simple steps to unlock your genetic insights</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="relative p-6 sm:p-8 bg-card hover:shadow-lg transition-all duration-300 border-border group">
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-6xl sm:text-7xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">{step.number}</div>
              <div className="relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


