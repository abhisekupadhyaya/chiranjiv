import { memo } from "react";

export const WhyFree = memo(function WhyFree() {
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
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header */}
        <div className="mb-12 text-center md:mb-20">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Why Is This ₹1.5 Lakh Test Free?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground sm:text-xl">
            Because India deserves to be represented in global health science.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          
          {/* Left Column: Manifesto Card - Refined Design */}
          <div className="flex flex-col">
            <div className="relative h-full overflow-hidden rounded-3xl bg-neutral-200/80 p-8 shadow-2xl shadow-black/20 ring-1 ring-white/10 sm:p-10 backdrop-blur-sm">
              {/* Refined Gradient Blobs */}
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-800/20 blur-[100px]" />
              <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary-800/15 blur-[100px]" />
              
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="mb-6 text-2xl font-medium leading-tight text-neutral-1000 sm:text-3xl">
                    We're building the largest Indian genomic reference database.
                  </h3>
                  <p className="mb-10 text-lg leading-relaxed text-neutral-800/90">
                    Early users get full access at no cost — including lifetime wellness insights.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Trust Signals Grid */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {[
                      { title: "No Ads", desc: "Your data is never sold" },
                      { title: "No Insurance", desc: "No third-party sharing" },
                      { title: "No Hidden Fees", desc: "Always transparent" }
                    ].map((item) => (
                      <div key={item.title} className="relative">
                        <h4 className="text-base font-semibold text-neutral-1100">{item.title}</h4>
                        <p className="mt-1 text-sm text-neutral-700">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-neutral-1000/10 pt-8 text-center">
                    <p className="text-base font-medium text-primary-300">
                      Just science-backed wellness for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Grid - Visual Balance */}
          <div className="flex flex-col justify-center">
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/40 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/60 hover:bg-white/60 hover:shadow-xl hover:shadow-black/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="relative z-10">
                    <h3 className="mb-2 text-lg font-semibold text-neutral-200">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
