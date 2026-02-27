import { memo } from "react";

// Icons matching website/Website/Chiranjiv_New.html Trust & Security section
function IconEncryption({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconDataIndia({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  );
}
function IconScientists({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2v7.31" />
      <path d="M14 9.3V1.99" />
      <path d="M8.5 2h7" />
      <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
      <path d="M5.52 16h12.96" />
    </svg>
  );
}
function IconDatabase({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export const TrustFeatures = memo(function TrustFeatures() {
  const features = [
    {
      title: "End-to-End Encryption",
      description:
        "Your genetic data is encrypted from the moment it's collected until it reaches your personal dashboard. No one — not even us — can access your raw data without your explicit consent.",
      Icon: IconEncryption,
      iconBoxClass: "bg-primary-500/10 ring-1 ring-primary-500/20 group-hover:ring-primary-500/40",
      iconColorClass: "text-primary-600",
    },
    {
      title: "Data Stored in India",
      description:
        "All data is stored exclusively on Indian servers, ensuring full data sovereignty and compliance with Indian data protection regulations. Your genome never leaves the country.",
      Icon: IconDataIndia,
      iconBoxClass: "bg-secondary-500/10 ring-1 ring-secondary-500/20 group-hover:ring-secondary-500/40",
      iconColorClass: "text-secondary-600",
    },
    {
      title: "Built by Scientists & Experts",
      description:
        "Founded by longevity experts and genomic researchers with decades of experience across IITs, IIMs, and leading global institutions like UC Berkeley.",
      Icon: IconScientists,
      iconBoxClass: "bg-amber-500/10 ring-1 ring-amber-500/20 group-hover:ring-amber-500/40",
      iconColorClass: "text-amber-600",
    },
    {
      title: "India-First Genomic Database",
      description:
        "Building the largest repository of Indian genetic data for better, population-specific health insights — so research finally represents our biology, not just Western populations.",
      Icon: IconDatabase,
      iconBoxClass: "bg-violet-500/10 ring-1 ring-violet-500/20 group-hover:ring-violet-500/40",
      iconColorClass: "text-violet-600",
    },
  ];

  return (
    <section className="relative w-full pt-10 sm:pt-16 pb-8 sm:pb-10">
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
          {features.map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10 sm:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-3 min-h-[2.75rem]">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${feature.iconBoxClass}`} aria-hidden>
                      <Icon className={`shrink-0 w-4 h-4 ${feature.iconColorClass}`} />
                    </div>
                    <h3 className="text-left text-xl font-semibold text-neutral-200 pt-0.5">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-foreground text-left">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

