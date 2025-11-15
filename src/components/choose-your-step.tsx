import { Button } from '@/components/ui/button'

export function ChooseYourStep() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const CheckIcon = () => (
    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
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
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-foreground mb-5 sm:mb-6 text-balance tracking-tight leading-[1.1]">
              Choose Your First Step
            </h2>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto mb-12 sm:mb-16">
            {/* Basic Health & Ancestry Report Card */}
            <div className="relative glass-backdrop backdrop-blur-sm border border-primary/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 flex flex-col">
              <div className="flex flex-col flex-1">
                {/* Header Section */}
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground mb-6 leading-tight h-[3.5rem] flex items-center">
                    Basic Health & Ancestry Report
                  </h3>
                  
                  {/* Pricing - fixed height container */}
                  <div className="h-[4rem] flex flex-col justify-center mb-4">
                    <div className="flex items-baseline gap-3">
                      <div className="text-3xl sm:text-4xl font-extralight tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        FREE
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-primary/80 font-light mt-1">For Early Access Members</div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty min-h-[3rem]">
                    Start with core ancestry and foundational wellness insights. A perfect on-ramp to your genome.
                  </p>
                </div>

                {/* Features List - grows to fill space */}
                <div className="space-y-3 mb-8 flex-1">
                  {[
                    'Ancestry overview (India + global context)',
                    'Foundational wellness markers (non-diagnostic)',
                    'Starter nutrition pointers',
                    'Data ownership & control dashboard',
                    'Downloadable summary (PDF)'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm font-light text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - anchored at bottom with separator */}
                <div className="pt-8 border-t border-border/30">
                  <Button 
                    onClick={scrollToWaitlist} 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-glow hover:scale-[1.02] transition-all"
                    size="lg"
                  >
                    Earn Early Access
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Ancestry & Personalized Health Card */}
            <div className="relative glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 [animation-delay:100ms] flex flex-col">
              <div className="flex flex-col flex-1">
                {/* Header Section */}
                <div className="mb-8">
                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-foreground mb-6 leading-tight h-[3.5rem] flex items-center">
                    Advanced Ancestry & Personalized Health
                  </h3>
                  
                  {/* Pricing - fixed height container */}
                  <div className="h-[4rem] flex flex-col justify-center mb-4">
                    <div className="flex items-baseline gap-3">
                      <div className="text-2xl sm:text-3xl font-extralight tracking-tight text-muted-foreground">
                        Future pricing
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed text-pretty min-h-[3rem]">
                    Go deeper with regional ancestry resolution and personalized health guidance calibrated for Indian genomes.
                  </p>
                </div>

                {/* Features List - grows to fill space */}
                <div className="space-y-3 mb-8 flex-1">
                  {[
                    'Fine-grained regional ancestry (as references expand)',
                    'Personalized nutrition plan & metabolism insights',
                    'Fitness & recovery tendencies',
                    'Early risk indicators (non-diagnostic)',
                    'Medication & sensitivity flags (where supported)',
                    'Priority updates as new models launch',
                    'Export to your healthcare provider'
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm font-light text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button - anchored at bottom with separator */}
                <div className="pt-8 border-t border-border/30">
                  <Button 
                    variant="outline" 
                    className="w-full bg-transparent hover:bg-transparent hover:border-border/50 hover:text-muted-foreground transition-all border-border/50 cursor-not-allowed"
                    size="lg"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
