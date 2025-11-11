import { Card } from '@/components/ui/card'

const steps = [
  { number: '01', title: 'Order Your Kit', description: "Join the waitlist. We'll ship your free DNA collection kit to your doorstep.", icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
  )},
  { number: '02', title: 'Collect & Send Back', description: 'Spit in the tube (2 min), seal it, and send it back using our prepaid shipping label.', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
  )},
  { number: '03', title: 'Get Your Genome', description: 'We sequence your full genome (6–8 weeks) and unlock your personalized health dashboard.', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
  )},
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">How It Works</h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">Three simple steps to unlock your genetic potential</p>
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


