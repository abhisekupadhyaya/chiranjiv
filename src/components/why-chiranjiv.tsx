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
    title: 'Built for India',
    description:
      'South Asian reference genomes. Ancestry insights that actually reflect your roots.',
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
            {features.map((feature, index) => {
              const isHero = index === 0
              const isWide = index === 3
              const delayClass =
                index === 0
                  ? ''
                  : index === 1
                  ? '[animation-delay:120ms]'
                  : index === 2
                  ? '[animation-delay:220ms]'
                  : index === 3
                  ? '[animation-delay:320ms]'
                  : index === 4
                  ? '[animation-delay:420ms]'
                  : '[animation-delay:520ms]'

              if (isHero) {
                return (
                  <Card
                    key={index}
                    className={`relative md:col-span-2 lg:row-span-2 glass-backdrop glass-border-refractive bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 backdrop-blur-sm border border-border/60 rounded-3xl shadow-2xl hover:shadow-[0_24px_80px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${delayClass}`}
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
                    
                    {/* Box + DNA out-of-the-box effect */}
                    <div className="absolute bottom-0 right-0 w-3/4 h-2/3 pointer-events-none">
                      {/* Box at the base */}
                      <img
                        src="/images/features/box.png"
                        alt="Genome kit box"
                        className="absolute bottom-0 right-4 w-32 sm:w-40 lg:w-52 h-auto object-contain opacity-45 group-hover:opacity-65 group-hover:translate-y-1 transition-all duration-700"
                        loading="lazy"
                      />
                      {/* DNA rising out of the box */}
                      <img
                        src="/images/features/dna.png"
                        alt="DNA coming out of box"
                        className="absolute bottom-10 sm:bottom-12 lg:bottom-16 right-0 sm:right-6 lg:right-10 w-32 sm:w-40 lg:w-52 h-auto object-contain opacity-55 group-hover:opacity-80 group-hover:-translate-y-1 transition-all duration-700"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="relative z-10 p-8 sm:p-10 flex flex-col justify-between h-full gap-6">
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground leading-snug">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              }

              if (isWide) {
                return (
                  <Card
                    key={index}
                    className={`relative lg:col-span-2 glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${delayClass}`}
                  >
                    {/* Supplements image */}
                    <img
                      src="/images/features/vitamins.png"
                      alt="Personalized supplements"
                      className="absolute right-0 top-0 h-full w-1/2 object-contain opacity-30 group-hover:opacity-50 transition-all duration-700 pointer-events-none"
                      loading="lazy"
                    />
                    
                    <div className="flex flex-col sm:flex-row items-stretch h-full">
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                        <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                )
              }

              return (
                <Card
                  key={index}
                  className={`relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4 ${delayClass}`}
                >
                  
                  {/* Personalized Reports - index 2 */}
                  {index === 2 && null}
                  
                  {/* Built for India - index 4 */}
                  {index === 4 && null}
                  
                  <div className="relative z-10 p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}


