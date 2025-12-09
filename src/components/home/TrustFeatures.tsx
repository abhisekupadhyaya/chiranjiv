import { memo } from "react";

export const TrustFeatures = memo(function TrustFeatures() {
  const features = [
    {
      title: "Built by Scientists & Experts",
      description: "Founded by longevity experts and genomic researchers with decades of experience"
    },
    {
      title: "India-First Genomic Database",
      description: "Building the largest repository of Indian genetic data for better health insights"
    },
    {
      title: "End-to-End Encryption",
      description: "Your genetic data is encrypted from collection until it reaches your dashboard"
    },
    {
      title: "Data Stored in India",
      description: "All data stored exclusively in India, ensuring data sovereignty and compliance"
    }
  ];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <h3 className="mb-3 text-xl font-semibold text-neutral-200">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

