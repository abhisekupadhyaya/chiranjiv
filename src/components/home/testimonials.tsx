import { Card } from '@/components/ui/card'

const testimonials = [
  {
    quote:
      'Chiranjiv helped me get serious about my fitness and diet—not just ticking a box for wellness, but seeing real results.',
    attribution: 'Fitness Enthusiast, Pune',
  },
  {
    quote:
      'As a parent, knowing what my kids are prone to—and planning their routines now—has been empowering.',
    attribution: 'Chiranjiv User',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
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
              What Our Users Say
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground text-pretty leading-relaxed font-light">
              Real experiences from early Chiranjiv users
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => {
              const delayClass =
                index === 0 ? '' : '[animation-delay:150ms]'

              return (
                <div
                  key={index}
                  className={`animate-in fade-in zoom-in-95 duration-700 ${delayClass}`}
                >
                  <Card className="group relative h-full glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card/80">
                    <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Opening quote mark */}
                      <div className="text-5xl sm:text-6xl font-serif text-primary/30 leading-none mb-3 sm:mb-4">
                        "
                      </div>
                      {/* Quote text */}
                      <blockquote className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed text-pretty mb-4 sm:mb-6 flex-1">
                        {testimonial.quote}
                      </blockquote>
                      {/* Attribution */}
                      <p className="text-xs sm:text-sm text-muted-foreground font-light tracking-wide">
                        — {testimonial.attribution}
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

