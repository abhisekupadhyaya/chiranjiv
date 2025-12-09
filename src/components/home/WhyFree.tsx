import { memo } from "react";

export const WhyFree = memo(function WhyFree() {
  return (
    <section className="relative pt-20 pb-8 sm:pt-32 sm:pb-12 overflow-hidden">
      {/* Background Gradient Blobs - Global for section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary-800/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-secondary-800/10 blur-[100px] pointer-events-none mix-blend-overlay" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header Content */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8">
          <h2 className="mb-6 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Why Is This ₹1.5 Lakh Test Free?
          </h2>
          <p className="mb-10 text-xl text-foreground/90 sm:text-2xl max-w-2xl mx-auto leading-relaxed">
            Because India deserves to be represented in global health science.
          </p>
          
          {/* The "Card" Look Restored */}
          <div className="relative w-full overflow-hidden rounded-3xl bg-neutral-200/80 p-8 shadow-2xl shadow-black/20 ring-1 ring-white/10 sm:p-12 backdrop-blur-sm">
            {/* Internal Card Blobs */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-800/20 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary-800/15 blur-[100px]" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="mb-6 text-2xl font-medium leading-tight text-neutral-1000 sm:text-3xl lg:text-4xl max-w-3xl">
                We're building the largest Indian genomic reference database.
              </h3>
              <p className="text-lg leading-relaxed text-neutral-900 max-w-2xl mb-12">
                Early users get full access at no cost — including lifetime wellness insights.
              </p>

              {/* Trust Signals Inside Card */}
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 w-full max-w-2xl mx-auto mb-10">
                {[
                  { title: "Ethical research partnerships" },
                  { title: "Optional premium features for users" }
                ].map((item) => (
                  <div key={item.title} className="flex flex-col items-center text-center">
                    <h4 className="text-lg font-semibold text-neutral-1000 mb-1">{item.title}</h4>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-neutral-900/10 pt-8 w-full">
                <p className="text-base font-medium text-primary-300">
                   Just science-backed wellness for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});
