import { Button } from "@/components/ui/button"

export function YourDNA() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
              Your DNA Doesn't Change.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mx-auto max-w-2xl text-pretty leading-relaxed font-light">
              But what you do with it can change your life.
            </p>
          </div>

          {/* Message Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 p-8 sm:p-12 shadow-xl glass-backdrop backdrop-blur-md animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

            <div className="relative z-10">
              {/* Points Grid */}
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-12">
                {/* Point 1 */}
                <div className="flex flex-col gap-2 group">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    Better Energy
                  </h3>
                  <p className="text-foreground/90 leading-relaxed font-light">
                    Optimize your daily vitality with insights tailored to your genetic makeup.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="flex flex-col gap-2 group">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    Better Sleep
                  </h3>
                  <p className="text-foreground/90 leading-relaxed font-light">
                    Understand your sleep genetics to improve rest and recovery.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="flex flex-col gap-2 group">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    Better Metabolism
                  </h3>
                  <p className="text-foreground/90 leading-relaxed font-light">
                    Get personalized nutrition insights that work with your body, not against it.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="flex flex-col gap-2 group">
                  <h3 className="text-xl font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    Better Immunity
                  </h3>
                  <p className="text-foreground/90 leading-relaxed font-light">
                    Strengthen your defenses by understanding your genetic predispositions.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 border-t border-border/40" />

              {/* Ending & CTA */}
              <div className="flex flex-col items-center text-center">
                <p className="mb-8 text-lg font-medium text-foreground/80">
                  All starting with a single test — free for early users.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 btn-glow shadow-lg shadow-primary/20"
                    asChild
                  >
                    <a href="#waitlist">Claim Your Free DNA Report</a>
                  </Button>
                  <p className="text-sm font-medium text-foreground/90">
                    Worth ₹1,50,000 — Limited Early Access Spots
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* After Card Text */}
          <p className="mt-12 text-center text-lg text-foreground/90 font-light">
            Join thousands of Indians upgrading their health through DNA.
          </p>
        </div>
      </div>
    </section>
  )
}
