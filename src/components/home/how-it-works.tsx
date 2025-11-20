import { Card } from '@/components/ui/card'

const steps = [
  {
    number: '01',
    title: 'Join the Waitlist',
    description:
      'Sign up now to secure your spot. Refer friends to climb the ranks and get early access.',
  },
  {
    number: '02',
    title: 'Sample Collection',
    description:
      'Schedule At home Sample Collection at your convenience',
  },
  {
    number: '03',
    title: 'Get Your Results',
    description:
      'Access your comprehensive reports and personalized recommendations through the app.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient + floating orbs (shared visual language) */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed">
            Three simple steps to unlock your genetic insights
          </p>
        </div>

        {/* Horizontal flex layout */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const delayClass =
                index === 0
                  ? ''
                  : index === 1
                  ? '[animation-delay:120ms]'
                  : '[animation-delay:220ms]'

              return (
                <div
                  key={step.number}
                  className={`flex-1 animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClass}`}
                >
                  <Card className="group relative h-full glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-card/80">
                    <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 space-y-3 sm:space-y-4">
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary/70">
                          Step {step.number}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-light text-foreground leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-pretty">
                        {step.description}
                      </p>
                    </div>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


