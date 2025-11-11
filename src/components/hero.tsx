import { Button } from '@/components/ui/button'
import { DnaHelix } from '@/components/dna-helix'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute inset-0 opacity-25">
        <DnaHelix />
      </div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 backdrop-blur-sm border border-border mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              India&apos;s First Citizen-Led Genome Sequencing Initiative
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            <span className="inline-block text-foreground">Your DNA.</span>{' '}
            <span className="inline-block text-foreground">Your Future.</span>{' '}
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-400 animate-gradient-x">
              Your Control.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-pretty leading-relaxed">
            Become a Founding Genome Member. The first participants receive ₹1.5 L worth of genome sequencing and
            reports at no cost. Invite friends to rise in the queue and secure your early access.
          </p>
          <div className="flex items-center justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
              asChild
            >
              <a href="#waitlist">Earn Early Access</a>
            </Button>
          </div>
          <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ethical & Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Data Stored in India</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.969 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span>Science-Backed Insights</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


