import { Button } from '@/components/ui/button'
import { DnaHelix } from '@/components/dna-helix'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-12 sm:pb-16 hero-section">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 opacity-10">
        <DnaHelix />
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/40 backdrop-blur-sm border border-border/40 mb-5 sm:mb-7">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" />
            <span className="text-xs sm:text-sm font-medium text-foreground/90 tracking-wider">
              India&apos;s First Citizen-Led Genome Sequencing Initiative
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl hero-headline text-foreground mb-4 sm:mb-6 md:mb-8 text-balance font-extralight leading-[1.1] tracking-tight">
            <span className="inline-block text-foreground">Your DNA.</span>{' '}
            <span className="inline-block text-foreground">Your Future.</span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-400 animate-gradient-x font-extralight">
              Your Control.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 mx-auto text-pretty leading-relaxed max-w-3xl font-light">
            Early users receive ₹1.5 L worth of Genome sequencing and DNA-based reports designed to optimize your health, wellness, and food choices.
          </p>
          <div className="inline-flex md:flex items-start md:items-center gap-3 max-w-xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center">
            <span className="w-1 h-6 rounded-full bg-emerald-400/90 flex-shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
              <span className="font-medium">Join the waitlist.</span> Share your unique referral code to <span className="font-medium">skip the queue</span>.{' '}
              <span className="block sm:inline">The more friends who sign up, the <span className="font-medium">faster you move up</span>.</span>
            </p>
          </div>
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background px-8 py-6 text-base"
              asChild
            >
              <a href="#waitlist">Join Early Access</a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-muted-foreground">
            <span className="font-light tracking-wide text-xs sm:text-sm">Ethical & Transparent</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Bank-Grade Security</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Data Stored in India</span>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-light tracking-wide text-xs sm:text-sm">Science-Backed Insights</span>
          </div>
        </div>
      </div>
    </section>
  )
}


