import { Button } from '@/components/ui/button'
import { DnaHelix } from '@/components/home/dna-helix'

export function Hero() {
  return (
    <section id="hero" className="relative flex items-center justify-center overflow-hidden pt-16 pb-0 sm:pb-1 hero-section">
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl hero-headline text-foreground mb-3 sm:mb-4 md:mb-5 text-balance font-extralight leading-[1.1] tracking-tight px-4 sm:px-0 break-words">
            Unlock Your Body's Hidden Potential
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/90 mb-3 sm:mb-4 mx-auto text-pretty leading-relaxed max-w-3xl font-light px-4 sm:px-0 break-words">
            Find out <span className="text-primary font-bold">EXACTLY</span> how your body works — why you gain weight, why you feel tired, why sleep feels broken, and what your <span className="text-primary font-bold">DNA</span> says about improving it.
          </p>
          <p className="text-sm sm:text-base text-foreground/90 mb-4 sm:mb-5 md:mb-6 mx-auto text-pretty leading-relaxed max-w-3xl font-light px-4 sm:px-0 break-words">
            Most people try diets, workouts, and supplements blindly. <span className="text-primary font-bold">Your DNA tells you what will actually work for YOU.</span> Chiranjiv analyzes <span className="text-primary font-bold">3 billion genetic data points</span> to reveal your true biology — and gives you clear, personalized steps to improve your everyday health.
          </p>
          <p className="text-sm sm:text-base text-foreground/90 mb-4 sm:mb-5 md:mb-6 mx-auto leading-relaxed max-w-3xl font-light px-4 sm:px-0 break-words">
            Join the waitlist for <span className="text-primary font-bold">₹1.5 L worth of genetic reports</span> included at no cost to early users.
          </p>
          <div className="flex items-center justify-center mb-4 sm:mb-5">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background px-8 py-6 text-base"
              asChild
            >
              <a href="#waitlist">Join Early Access</a>
            </Button>
          </div>
          {/* Removed tagline chips: Ethical & Transparent, Highly Secure, Data Stored in India, Science-Backed Insights */}
        </div>
      </div>
    </section>
  )
}

