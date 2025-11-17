import { Card } from '@/components/ui/card'

const features = [
  {
    title: 'Complete Genome Sequencing',
    description:
      'Get 100% of your genome sequenced with our at-home kit or upload existing DNA data from any source.',
  },
  {
    title: 'Secure Data Storage',
    description:
      'We store and archive your full DNA data forever, with industry-leading security and privacy measures.',
  },
  {
    title: 'Personalized Reports',
    description:
      'Receive insights on health, allergies, nutrition, and medical conditions tailored to your DNA.',
  },
  {
    title: 'Personalized Supplements',
    description:
      'Based on your genetic profile, we recommend and provide supplements specifically formulated for your needs.',
  },
  {
    title: 'Data Co-Ownership',
    description:
      'You co-own the collective genomic database we build together. Your data, your rights, your future.',
  },
  {
    title: 'Lifetime Updates',
    description:
      'New insights as genomic science evolves. Continuous updates throughout your lifetime.',
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
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            Why Chiranjiv?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light max-w-3xl mx-auto">
            We&apos;re revolutionizing personal genomics by making it accessible to everyone.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[200px]">
                  <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty">
                    {feature.description}
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


