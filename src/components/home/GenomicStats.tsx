import { memo } from "react";

export const GenomicStats = memo(function GenomicStats() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decorative elements matching Insights */}
      <div className="absolute top-1/3 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary-300/5 blur-[100px] translate-x-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-secondary-300/5 blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Most people try diets, workouts, <br className="hidden sm:block" />
            and supplements blindly.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground sm:text-xl">
            Your DNA tells you what will actually work for <span className="font-semibold text-primary-500">YOU</span>.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Message Card */}
          <div className="relative group">
            {/* Glow effect behind card */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-secondary-500/20 via-accent-500/20 to-primary-500/20 opacity-75 blur transition duration-500 group-hover:opacity-100" />
            
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/20">
                   {/* Abstract DNA/Data Icon constructed with CSS shapes */}
                   <div className="flex gap-1">
                      <div className="h-6 w-1.5 rounded-full bg-white/90" />
                      <div className="h-4 w-1.5 rounded-full bg-white/70 self-end" />
                      <div className="h-5 w-1.5 rounded-full bg-white/80 self-center" />
                   </div>
                </div>
                
                <p className="text-xl font-medium leading-relaxed text-neutral-200 sm:text-2xl">
                  "Chiranjiv analyzes <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-400 to-primary-400">3 billion genetic data points</span> to reveal your true biology — and gives you clear, personalized steps to improve your everyday health."
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-8 sm:grid-cols-1">
            {/* Stat 1 */}
            <div className="flex flex-col gap-2 border-l-2 border-neutral-800 pl-6 transition-colors hover:border-secondary-500/50">
              <div className="text-5xl font-bold tracking-tighter text-secondary-500 sm:text-6xl">
                1.4B
              </div>
              <div>
                <p className="text-foreground">India represents 18% of humanity, but less than 2% of genomic research.</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2 border-l-2 border-neutral-800 pl-6 transition-colors hover:border-accent-500/50">
              <div className="text-5xl font-bold tracking-tighter text-accent-500 sm:text-6xl">
                4,600+
              </div>
              <div>
                <p className="text-foreground">Ethnic groups in India with genetic diversity rivaling entire continents.</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2 border-l-2 border-neutral-800 pl-6 transition-colors hover:border-primary-500/50 w-full">
              <div className="text-5xl font-bold tracking-tighter text-primary-500 sm:text-6xl">
                Global
              </div>
              <div>
                <p className="text-foreground">Building India's genomic infrastructure benefits South Asia and the world.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
