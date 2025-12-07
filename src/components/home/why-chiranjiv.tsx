import { Card } from '@/components/ui/card'

const features = [
  {
    label: 'Active Lifestyle',
    description:
      'DNA insights for energy, movement, fitness, and healthy aging—not just absence of disease.',
  },
  {
    label: 'Longevity Focus',
    description:
      'Clear strategies to protect your future, based on world-class and Indian genomic data.',
  },
  {
    label: 'Proactive Living',
    description:
      'Guidance for everyday choices that boost your fitness and protect against inflammation.',
  },
  {
    label: 'Family Health',
    description:
      'Options for family testing and collective wellbeing.',
  },
]

export function WhyChiranjiv() {
  return (
    <section
      id="why-chiranjiv"
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient and floating orbs to match other sections */}
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
        <div className="max-w-6xl mx-auto">
          {/* Two-column layout: heading on left, features on right */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1.9fr] gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left column: Section heading and subtitle */}
            <div className="md:sticky md:top-32 text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
                Why Chiranjiv?
              </h2>
              <p className="text-base sm:text-lg text-foreground/90 text-pretty leading-relaxed font-light">
                Built for active, future-focused Indians who want to live longer and better.
              </p>
            </div>

            {/* Right column: Feature list */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const delayClass =
                  index === 0
                    ? ''
                    : index === 1
                    ? '[animation-delay:100ms]'
                    : index === 2
                    ? '[animation-delay:200ms]'
                    : '[animation-delay:300ms]'

                return (
                  <div
                    key={feature.label}
                    className={`animate-in fade-in slide-in-from-right-4 duration-700 ${delayClass}`}
                  >
                    <Card className="group relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl hover:translate-x-1 transition-all duration-300 bg-card/80">
                      <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
                        <div className="sm:min-w-[140px]">
                          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-primary/80">
                            {feature.label}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-foreground/90 font-light leading-relaxed text-pretty flex-1">
                          {feature.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

