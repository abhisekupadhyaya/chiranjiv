import { memo } from "react";

// Icons matching website/Website/Chiranjiv_New.html DNA Story cards (exact SVG paths)
function IconMetabolism({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
function IconFitness({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6.5 6.5h11" />
      <path d="M6.5 17.5h11" />
      <path d="M3 12h3" />
      <path d="M18 12h3" />
      <rect x="6" y="9" width="12" height="6" rx="1" />
    </svg>
  );
}
function IconSleep({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
function IconNutrient({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  );
}
function IconInflammation({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconFamily({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const CARD_ICONS = {
  metabolism: IconMetabolism,
  fitness: IconFitness,
  sleep: IconSleep,
  nutrient: IconNutrient,
  inflammation: IconInflammation,
  family: IconFamily,
} as const;

export const DNAStory = memo(function DNAStory() {
  const categories = [
    {
      title: "Metabolism & Weight Response",
      iconKey: "metabolism" as keyof typeof CARD_ICONS,
      items: [
        "Why you gain weight easily / slowly",
        "Your calorie burn profile",
        "Your carb & fat sensitivity"
      ],
      barColor: "bg-primary-600",
      dotColor: "bg-primary-500",
      iconBoxClass: "bg-primary-500/10 ring-1 ring-primary-500/20 group-hover:ring-primary-500/40",
      iconColorClass: "text-primary-600"
    },
    {
      title: "Fitness & Strength Potential",
      iconKey: "fitness" as keyof typeof CARD_ICONS,
      items: [
        "Are you built for strength, endurance, or a mix?",
        "Your injury risk & recovery patterns",
        "Optimal training intensity for your genes"
      ],
      barColor: "bg-secondary-600",
      dotColor: "bg-secondary-500",
      iconBoxClass: "bg-secondary-500/10 ring-1 ring-secondary-500/20 group-hover:ring-secondary-500/40",
      iconColorClass: "text-secondary-600"
    },
    {
      title: "Sleep & Stress Tendencies",
      iconKey: "sleep" as keyof typeof CARD_ICONS,
      items: [
        "Night owl vs early bird genetics",
        "How your brain handles stress",
        "Your cortisol reactivity"
      ],
      barColor: "bg-accent-500",
      dotColor: "bg-accent-500",
      iconBoxClass: "bg-accent-500/10 ring-1 ring-accent-500/20 group-hover:ring-accent-500/40",
      iconColorClass: "text-accent-600"
    },
    {
      title: "Nutrient Processing",
      iconKey: "nutrient" as keyof typeof CARD_ICONS,
      items: [
        "Vitamin D, B12, folate tendencies",
        "Gut health & lactose tolerance",
        "Your microbiome-influencing genes"
      ],
      barColor: "bg-yellow-500",
      dotColor: "bg-yellow-500",
      iconBoxClass: "bg-yellow-500/10 ring-1 ring-yellow-500/20 group-hover:ring-yellow-500/40",
      iconColorClass: "text-yellow-600"
    },
    {
      title: "Inflammation & Immunity",
      iconKey: "inflammation" as keyof typeof CARD_ICONS,
      items: [
        "Your baseline inflammation",
        "How your body responds to stressors",
        "Autoimmune risk indicators"
      ],
      barColor: "bg-destructive",
      dotColor: "bg-destructive",
      iconBoxClass: "bg-destructive/10 ring-1 ring-destructive/20 group-hover:ring-destructive/40",
      iconColorClass: "text-destructive"
    },
    {
      title: "Family Health Insights",
      iconKey: "family" as keyof typeof CARD_ICONS,
      items: [
        "Understand genetic patterns across your family",
        "Identify shared inherited traits & risks",
        "Plan proactive health for future generations"
      ],
      barColor: "bg-purple-500",
      dotColor: "bg-purple-500",
      iconBoxClass: "bg-purple-500/10 ring-1 ring-purple-500/20 group-hover:ring-purple-500/40",
      iconColorClass: "text-purple-600"
    }
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-20 sm:pb-32 backdrop-blur-3xl bg-white/80 border-y border-white/60">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-left md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Your DNA Tells You Your story.
          </h2>
          <p className="max-w-2xl text-lg text-foreground sm:text-xl">
            All explained in simple language — no medical jargon.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <div 
              key={category.title}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] group relative overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 sm:p-8"
            >
              {/* Top Color Band */}
              <div className={`absolute inset-x-0 top-0 h-2 ${category.barColor}`} />

              {/* Glass highlight moved below the color band */}
              <div className="absolute inset-x-0 top-2 h-px bg-gradient-to-r from-transparent via-neutral-200/20 to-transparent opacity-50" />
              
              <div className="flex items-start gap-3 pt-2 mb-3 min-h-[2.75rem]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${category.iconBoxClass}`} aria-hidden>
                  {(() => {
                    const Icon = CARD_ICONS[category.iconKey];
                    return <Icon className={`shrink-0 w-4 h-4 ${category.iconColorClass}`} />;
                  })()}
                </div>
                <h3 className="text-left text-lg font-semibold leading-tight text-neutral-200 pt-0.5">
                  {category.title}
                </h3>
              </div>
              
              <ul className="space-y-2">
                {category.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground leading-relaxed">
                    <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${category.dotColor}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
