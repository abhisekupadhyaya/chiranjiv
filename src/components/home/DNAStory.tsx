import { memo } from "react";

export const DNAStory = memo(function DNAStory() {
  const categories = [
    {
      title: "Metabolism & Weight Response",
      items: [
        "Why you gain weight easily / slowly",
        "Your calorie burn profile",
        "Your carb & fat sensitivity"
      ],
      barColor: "bg-primary-600",
      dotColor: "bg-primary-500"
    },
    {
      title: "Fitness & Strength Potential",
      items: [
        "Are you built for strength, endurance, or a mix?",
        "Your injury risk & recovery patterns"
      ],
      barColor: "bg-secondary-600",
      dotColor: "bg-secondary-500"
    },
    {
      title: "Sleep & Stress Tendencies",
      items: [
        "Night owl vs early bird genetics",
        "How your brain handles stress",
        "Your cortisol reactivity"
      ],
      barColor: "bg-accent-500",
      dotColor: "bg-accent-500"
    },
    {
      title: "Nutrient Processing",
      items: [
        "Vitamin D, B12, folate tendencies",
        "Gut health & lactose tolerance",
        "Your microbiome-influencing genes"
      ],
      barColor: "bg-yellow-500",
      dotColor: "bg-yellow-500"
    },
    {
      title: "Inflammation & Immunity",
      items: [
        "Your baseline inflammation",
        "How your body responds to stressors"
      ],
      barColor: "bg-destructive",
      dotColor: "bg-destructive"
    },
    {
      title: "Family Health Insights",
      items: [
        "Understand genetic patterns across your family",
        "Identify shared inherited traits & risks",
        "Plan proactive health for future generations"
      ],
      barColor: "bg-purple-500",
      dotColor: "bg-purple-500"
    }
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-20 sm:pb-32 backdrop-blur-3xl bg-white/80 border-y border-white/60">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Your DNA Tells You Your story.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground sm:text-xl">
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
              
              <h3 className="mb-3 text-lg font-semibold leading-tight text-neutral-200 pt-2 text-center">
                {category.title}
              </h3>
              
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
