import { Card } from '@/components/ui/card'

export function DNAStory() {
  const categories = [
    {
      title: "Metabolism & Weight Response",
      items: [
        "Why you gain weight easily / slowly",
        "Your calorie burn profile",
        "Your carb & fat sensitivity"
      ],
      colorClass: "bg-primary"
    },
    {
      title: "Fitness & Strength Potential",
      items: [
        "Are you built for strength, endurance, or a mix?",
        "Your injury risk & recovery patterns"
      ],
      colorClass: "bg-secondary"
    },
    {
      title: "Sleep & Stress Tendencies",
      items: [
        "Night owl vs early bird genetics",
        "How your brain handles stress",
        "Your cortisol reactivity"
      ],
      colorClass: "bg-accent"
    },
    {
      title: "Nutrient Processing",
      items: [
        "Vitamin D, B12, folate tendencies",
        "Gut health & lactose tolerance",
        "Your microbiome-influencing genes"
      ],
      colorClass: "bg-amber-500"
    },
    {
      title: "Inflammation & Immunity",
      items: [
        "Your baseline inflammation",
        "How your body responds to stressors"
      ],
      colorClass: "bg-destructive"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient and floating orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
              Your DNA Tells You Your Story.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/90 mx-auto max-w-2xl text-pretty leading-relaxed font-light">
              All explained in simple language — no medical jargon.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.title}
                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] animate-in fade-in zoom-in-50 duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full group relative overflow-hidden glass-backdrop backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card/80">
                  {/* Top Color Band */}
                  <div className={`absolute inset-x-0 top-0 h-1.5 ${category.colorClass}`} />
                  
                  <h3 className="mb-4 text-lg font-medium text-foreground pt-2">
                    {category.title}
                  </h3>
                  
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90 leading-relaxed font-light">
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${category.colorClass}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
