import { Button } from '@/components/ui/button'
import { DnaHelix } from '@/components/dna-helix'

export function Hero() {
  return (
    <section 
      id="hero" 
      aria-labelledby="hero-heading"
      className="relative h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16 hero-section"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <DnaHelix />
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float opacity-80 sm:opacity-100" aria-hidden="true" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float opacity-80 sm:opacity-100"
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 backdrop-blur-sm border border-border/40 mb-5 sm:mb-7">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" aria-hidden="true" />
            <span className="text-xs sm:text-sm font-medium text-foreground/90 tracking-wider">
              India&apos;s First Citizen-Led Genome Sequencing Initiative
            </span>
          </div>
          <h1 
            id="hero-heading"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl hero-headline text-foreground mb-5 sm:mb-7 md:mb-9 text-balance font-extralight leading-[1.15] sm:leading-[1.1] tracking-tight"
          >
            <span className="inline-block text-foreground">Your DNA.</span>{' '}
            <span className="inline-block text-foreground">Your Future.</span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-400 animate-gradient-x font-extralight">
              Your Control.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-7 sm:mb-9 md:mb-11 mx-auto text-pretty leading-relaxed sm:leading-relaxed md:leading-loose max-w-3xl font-light">
            Early users receive ₹1.5 L worth of Genome sequencing and DNA-based reports designed to optimize your health, wellness, and food choices.
          </p>
          <div className="flex items-center max-w-xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center rounded-2xl border border-emerald-400/70 ring-1 ring-emerald-400/40 shadow-md shadow-emerald-500/15 px-4 sm:px-6 md:px-7 py-4 sm:py-4.5 md:py-5">
            <p className="text-[13px] leading-[1.6] sm:text-sm sm:leading-relaxed md:text-base md:leading-loose text-foreground/90">
              <span className="font-medium">Join the waitlist.</span> Share your unique referral code to <span className="font-medium">skip the queue</span>. The more friends who sign up, the <span className="font-medium">faster you move up</span>.
            </p>
          </div>
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] btn-glow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background px-8 py-6 text-base"
              asChild
            >
              <a href="#waitlist" aria-label="Join early access waitlist for genome sequencing">
                Join Early Access
              </a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-muted-foreground/90">
            <span className="font-light tracking-wide text-xs sm:text-sm">Ethical & Transparent</span>
            <span className="text-muted-foreground/40" aria-hidden="true">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Bank-Grade Security</span>
            <span className="text-muted-foreground/40" aria-hidden="true">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Data Stored in India</span>
            <span className="text-muted-foreground/40" aria-hidden="true">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Science-Backed Insights</span>
          </div>
        </div>
      </div>
    </section>
  )
}


