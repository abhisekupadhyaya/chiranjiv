import { memo } from "react";

export const LifeOS = memo(function LifeOS() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background decorative elements matching the home section language */}
      <div className="absolute top-1/3 right-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary-300/5 blur-[100px] translate-x-1/3" />
      <div className="absolute bottom-0 left-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-secondary-300/5 blur-[100px] -translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <span className="text-primary-500 font-bold tracking-widest uppercase text-xs mb-3 block">
              Your LIFE OS
            </span>
            <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
              Your Genome, Made Simple.
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-foreground sm:text-xl">
              LifeOS™ is your personal dashboard that turns complex genetic data into{" "}
              <span className="font-semibold text-neutral-200">clear, actionable insights</span> — so you
              understand what works for your body without needing a PhD to read it.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Interactive metabolic & cognitive risk monitoring
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Personalized longevity & recovery protocols
              </li>
              <li className="flex items-center gap-3 text-foreground font-medium">
                <span className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  ✓
                </span>
                Plain-English explanations of what each gene variant means for you
              </li>
            </ul>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary-400/20 to-primary-500/10 blur-[60px] opacity-60 animate-pulse" />
            <div className="relative w-full max-w-[480px] mx-auto hover:scale-[1.01] transition-transform duration-500">
              <img
                src="/lifeos-dashboard.png"
                alt="Chiranjiv LifeOS Dashboard — personalised genomic insights"
                className="w-full rounded-2xl shadow-2xl border border-white/20 ring-1 ring-black/5"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
