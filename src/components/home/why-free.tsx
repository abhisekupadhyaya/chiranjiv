import { Card } from '@/components/ui/card'

export function WhyFree() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background elements matching other sections */}
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Centered Header */}
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
              Why Is This <span className="text-primary font-normal">₹1.5 Lakh</span> Test Free?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mx-auto max-w-2xl text-pretty leading-relaxed font-light">
              Because India deserves to be represented in global health science.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:gap-10 place-items-center">
            
            {/* Left Column: Manifesto Card */}
            <div className="flex w-full max-w-6xl flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card className="relative h-full overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-4 sm:p-6 shadow-xl glass-backdrop backdrop-blur-md group">
                {/* Background Accents */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
                
                <div className="relative z-10 flex h-full flex-col justify-between gap-4 text-center">
                  <div>
                    <h3 className="mb-3 text-xl sm:text-2xl font-light leading-tight text-foreground text-balance">
                      We're building the <span className="font-normal text-primary">largest Indian genomic reference database</span>.
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/90 font-light">
                      Early users get full access at no cost — including lifetime wellness insights.
                    </p>
                  </div>

                  <div className="space-y-4 mt-auto">
                    {/* Trust Signals Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 border-t border-border/30 justify-items-center">
                      {[
                        { title: "Ethical research partnerships" },
                        { title: "Optional premium features for users" }
                      ].map((item) => (
                        <div key={item.title} className="relative text-center">
                          <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-border/30 pt-3 text-center">
                      <p className="text-sm font-medium text-primary/80 tracking-wide">
                        Just science-backed wellness for everyone.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column removed: feature cards were intentionally deleted */}

          </div>
        </div>
      </div>
    </section>
  );
}

