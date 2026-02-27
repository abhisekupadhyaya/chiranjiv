import { memo } from "react";

// Icons matching website/Website/Chiranjiv_New.html Why Free section
function IconWePay({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 6v2" />
      <path d="M12 16v2" />
    </svg>
  );
}
function IconYouContribute({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconIndiaBenefits({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

const cards = [
  {
    title: "We Pay",
    description: "We cover the sequencing cost. There are no hidden fees or subscription charges.",
    Icon: IconWePay,
    iconBoxClass: "bg-primary-500/15 ring-1 ring-primary-400/20 group-hover:ring-primary-400/50",
    iconColorClass: "text-primary-400",
  },
  {
    title: "You Contribute",
    description: "You provide anonymized genomic data to help build the first Indian longevity model.",
    Icon: IconYouContribute,
    iconBoxClass: "bg-secondary-500/15 ring-1 ring-secondary-400/20 group-hover:ring-secondary-400/50",
    iconColorClass: "text-secondary-400",
  },
  {
    title: "India Benefits",
    description: "Together, we build the first comprehensive Indian longevity model to solve diseases specific to our population.",
    Icon: IconIndiaBenefits,
    iconBoxClass: "bg-accent-500/15 ring-1 ring-accent-500/20 group-hover:ring-accent-500/50",
    iconColorClass: "text-accent-400",
  },
];

export const WhyFree = memo(function WhyFree() {
  return (
    <section className="relative w-full overflow-hidden pt-10 sm:pt-16 pb-20 sm:pb-24 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400">
      <div className="absolute top-0 right-0 h-[28rem] w-[28rem] rounded-full bg-neutral-900/20 blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[26rem] w-[26rem] rounded-full bg-neutral-1000/15 blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            Why Is This ₹1.5 Lakh Test Free?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl leading-relaxed">
            Because India deserves to be represented in global health science.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
            <div
              key={card.title}
              className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-1000/30 sm:p-8"
            >
              <div className="flex items-start gap-3 mb-3 min-h-[2.75rem]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${card.iconBoxClass}`} aria-hidden>
                  <Icon className={`shrink-0 w-4 h-4 ${card.iconColorClass}`} />
                </div>
                <h3 className="text-left text-xl font-semibold text-white pt-0.5">{card.title}</h3>
              </div>
              <p className="text-left leading-relaxed text-neutral-900">
                {card.description}
              </p>
            </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-base font-medium text-primary-300">
            Just science-backed wellness for everyone.
          </p>
        </div>
      </div>
    </section>
  );
});
