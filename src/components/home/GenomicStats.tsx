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
                <div className="space-y-6 text-lg font-medium leading-relaxed text-neutral-200 sm:text-xl">
                  <p>
                    India is the world's most genetically diverse nation and the most underrepresented in global genomic databases.
                  </p>
                  <p>
                    Today, 86% of genomic research is based on European ancestry. That means health insights for most Indians are built on incomplete data. <span className="font-bold text-primary-400">Chiranjiv changes that.</span> We're building the largest Indian genomic reference database — and making it accessible to everyone.
                  </p>
                </div>
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
