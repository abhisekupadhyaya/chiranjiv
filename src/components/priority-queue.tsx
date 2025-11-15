import { Card } from '@/components/ui/card'

export function PriorityQueue() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float [animation-delay:2s]" />
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float [animation-delay:4s]" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 mb-5 sm:mb-7">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
              <span className="text-[11px] sm:text-xs font-light text-muted-foreground tracking-wide">
                Limited Time Offer
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.1] text-foreground mb-4 text-balance">
              Join the Founding Genome Wave
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty leading-relaxed font-light max-w-3xl mx-auto">
              Early Access members get lifetime benefits, co-ownership rights, and priority access to all future features.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Large Hero Card - 2,000 Founding Genomes */}
            <Card className="relative md:col-span-2 lg:row-span-2 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group overflow-hidden p-0 flex flex-col min-h-[400px]">
              <div className="p-8 sm:p-10 flex-shrink-0">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extralight tracking-tight text-foreground mb-4 leading-tight">
                  2,000 Founding Genomes
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                  Join the first wave of Indians to get full-genome sequencing
                </p>
              </div>
              <div className="relative overflow-hidden flex-1 min-h-[200px]">
                <img
                  src="/images/features/founding-genomes.jpg"
                  alt="2,000 Founding Genomes"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Card>

            {/* Priority Support - Image at top, text below */}
            <Card className="relative lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group overflow-hidden p-0 min-h-[240px]">
              <div className="relative overflow-hidden">
                <img
                  src="/images/features/priority-support.jpg"
                  alt="Priority Support"
                  className="w-full h-32 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-light tracking-tight text-foreground mb-3">
                  Priority Support
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  Direct line to our genomics team for questions and insights. Get expert guidance whenever you need it.
                </p>
              </div>
            </Card>

            {/* Data Co-Ownership - Circular image with text wrapping */}
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group overflow-hidden p-6 sm:p-8 min-h-[200px]">
              <h3 className="text-xl sm:text-2xl font-light tracking-tight text-foreground mb-3">
                Data Co-Ownership
              </h3>
              <div className="relative">
                <div 
                  className="float-right ml-4 mr-4 sm:mr-0 sm:ml-4 mb-2 -mt-8 sm:mt-0 w-24 h-24 sm:w-22 sm:h-22 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent/50 transition-all duration-300 group-hover:scale-110 shadow-lg"
                  style={{ shapeOutside: 'circle(50%)', shapeMargin: '0.75rem' }}
                >
                  <img
                    src="/images/features/data-ownership.jpg"
                    alt="Data Co-Ownership"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  You co-own the collective genomic database we build together. Your data, your rights.
                </p>
              </div>
            </Card>

            {/* Lifetime Updates - Split layout with image on right */}
            <Card className="relative bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group overflow-hidden p-0 min-h-[200px]">
              <div className="flex items-stretch h-full min-h-[200px]">
                <div className="flex-1 p-6 sm:p-8 pr-20 sm:pr-28 z-10 flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-foreground mb-3">
                    Lifetime Updates
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    Get new insights as genomic science evolves with continuous updates throughout your lifetime.
                  </p>
                </div>
                <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 overflow-hidden">
                  <img
                    src="/images/features/lifetime-updates.jpg"
                    alt="Lifetime Updates"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-card/80 to-transparent" />
                </div>
              </div>
            </Card>
          </div>

          {/* Value Proposition Card */}
          <div className="relative bg-gradient-to-br from-primary/10 via-card/50 to-accent/10 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl hover:border-primary/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:200ms] overflow-hidden group">
            {/* Subtle background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
              <div className="flex-1 w-full sm:w-auto">
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-foreground mb-3 leading-snug sm:leading-tight">
                  Worth ₹1,50,000. <span className="block sm:inline mt-1 sm:mt-0">Free for early users.</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed">
                  Full genome sequencing + lifetime health insights + data co-ownership
                </p>
              </div>
              <div className="w-full sm:w-auto text-left sm:text-right flex-shrink-0 border-t sm:border-t-0 sm:border-l border-border/30 pt-4 sm:pt-0 sm:pl-6 lg:pl-8">
                <div className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-primary mb-1.5">FREE</div>
                <div className="text-xs sm:text-sm text-primary/80 font-light tracking-wide">For Early Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


