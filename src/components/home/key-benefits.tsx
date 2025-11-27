import { Card } from '@/components/ui/card'

const benefits = [
  {
    title: 'Maximize Fitness, Longevity & Everyday Performance',
    description:
      'Discover genetic insights for proactive health, anti-inflammation, recovery, and lifestyle so you can make smarter choices every day.',
  },
  {
    title: 'Personalized Recommendations',
    description:
      'Actionable advice for your diet, fitness routine, sleep, and healthy aging—based on your unique DNA markers.',
  },
  {
    title: 'Not Just Wellness: True Fitness-Driven Results',
    description:
      'Go beyond generic wellness. Focus on endurance, muscle recovery, inflammation risks, and long-term vitality.',
  },
]

export function KeyBenefits() {
  return (
    <section
      id="key-benefits"
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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Key Benefits
          </h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

