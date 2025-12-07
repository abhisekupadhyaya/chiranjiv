export function IndianAncestry() {
  return (
    <section
      id="indian-ancestry"
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
        <div className="max-w-3xl mx-auto">
          <div className="animate-in fade-in zoom-in-95 duration-700">
            {/* Single content block with soft styling */}
            <div className="relative p-8 sm:p-10 md:p-12 rounded-3xl bg-card/50 backdrop-blur-sm border-t-2 border-t-primary/20 border-x border-b border-border/40 shadow-xl">
              <div className="absolute inset-0 pointer-events-none rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
              
              <div className="relative z-10 space-y-4 sm:space-y-5">
                {/* Eyebrow label */}
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-primary/80">
                    For Indian Cohort
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-foreground text-center tracking-tight leading-[1.15]">
                  Indian Ancestry Insights: Evolving, Optional
                </h2>

                {/* Body text */}
                <div className="space-y-4 pt-2">
                  <p className="text-base sm:text-lg text-foreground/90 font-light leading-relaxed text-center text-pretty">
                    While we provide ancestry information, our biggest value is in actionable health and fitness guidance tailored to Indian bodies and lifestyles.
                  </p>
                  <p className="text-sm sm:text-base text-foreground/90 font-light leading-relaxed text-center text-pretty">
                    As Indian genetic data grows, your ancestry features will keep getting richer—but you always stay in control, and ancestry insights remain completely optional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

