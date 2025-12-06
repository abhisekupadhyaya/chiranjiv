import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-4rem)] grid-rows-[45fr_auto_55fr] items-center justify-items-center text-center">
      {/* Top Spacer */}
      <div aria-hidden="true" />

      {/* Headline & Description Block - Perfectly Centered */}
      <div className="flex flex-col items-center z-10 px-4">
        <h1 className="mb-8 text-4xl font-medium tracking-tight text-neutral-200 sm:text-5xl lg:text-7xl">
          Your DNA Unlocks <br />
          <span className="bg-gradient-to-br from-secondary-500 via-accent-500 to-primary-500 bg-clip-text text-transparent">
            Your Best Body.
          </span>{" "}
          For Free.
        </h1>
        
        <p className="max-w-2xl text-base text-neutral-600 sm:text-lg">
          Discover what your genes say about your fitness, sleep, energy, immunity, and longevity — with India's most advanced DNA analysis.
        </p>
      </div>

      {/* CTA Group - Starts in bottom half with moderate spacing */}
      <div className="flex w-full flex-col items-center gap-8 self-start pt-12 pb-12 sm:pb-20">
        <Button size="lg" className="h-12 w-full px-8 text-base sm:w-auto">
          Join Early Access
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Ethical & Transparent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Highly Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Data Stored in India</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-neutral-200 bg-white/50 p-1 pl-4 pr-2 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/60">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="line-through decoration-neutral-400/50 dark:decoration-neutral-600">Worth ₹1,50,000</span>
              <span className="mx-2"></span>
              <span className="font-medium text-primary-600 dark:text-neutral-200">FREE for early users</span>
              <span className="mx-2 opacity-30">|</span>
            </span>
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
               Only a few spots left
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
