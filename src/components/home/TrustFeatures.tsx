import { memo } from "react";

export const TrustFeatures = memo(function TrustFeatures() {
  const features = [
    {
      title: "End-to-End Encryption",
      description:
        "Your genetic data is encrypted from the moment it's collected until it reaches your personal dashboard. No one — not even us — can access your raw data without your explicit consent."
    },
    {
      title: "Data Stored in India",
      description:
        "All data is stored exclusively on Indian servers, ensuring full data sovereignty and compliance with Indian data protection regulations. Your genome never leaves the country."
    },
    {
      title: "Built by Scientists & Experts",
      description:
        "Founded by longevity experts and genomic researchers with decades of experience across IITs, IIMs, and leading global institutions like UC Berkeley."
    },
    {
      title: "India-First Genomic Database",
      description:
        "Building the largest repository of Indian genetic data for better, population-specific health insights — so research finally represents our biology, not just Western populations."
    }
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-20 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Your Data. Your Control.
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed tracking-[0.01em] text-foreground sm:text-xl">
            Built with security and sovereignty at the foundation — not as an afterthought.
          </p>
        </div>

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

