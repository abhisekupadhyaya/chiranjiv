import { Card } from '@/components/ui/card'

const features = [
  {
    title: 'Step-by-Step Report',
    description:
      'Every result comes with easy-to-follow actions. Get practical advice, not just numbers.',
  },
  {
    title: 'Expert Support',
    description:
      'Genetic counselors and certified coaches available for one-on-one guidance.',
  },
  {
    title: 'Peace of Mind',
    description:
      'Move forward with confidence and know exactly what to do next.',
  },
]

const images = [
  '/images/features/RealPeopleInAction.png',
  '/images/features/FamilyMeals.png',
  '/images/features/ActiveLongevity.png',
]

export function PostTestExperience() {
  return (
    <section
      id="post-test-experience"
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
        <div className="max-w-4xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
              Post-Test Experience
            </h2>
            <p className="text-base sm:text-lg text-foreground/90 text-pretty leading-relaxed font-light">
              What happens after you get your results
            </p>
          </div>

          {/* Features - 3-column grid matching Key Benefits section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                >
                  <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                    <h3 className="text-lg sm:text-xl font-light tracking-tight text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/90 font-light leading-relaxed text-pretty">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Images section - visually separated from features */}
          <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-3xl overflow-hidden group"
              >
                <img
                  src={image}
                  alt={`Feature ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

