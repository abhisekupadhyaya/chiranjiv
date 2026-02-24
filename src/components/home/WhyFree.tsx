import { memo } from "react";

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

        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-1000/30 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">We Pay</h3>
            <p className="leading-relaxed text-neutral-900">
              We cover the sequencing cost. There are no hidden fees or subscription charges.
            </p>
          </div>

          <div className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-1000/30 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">You Contribute</h3>
            <p className="leading-relaxed text-neutral-900">
              You provide anonymized genomic data to help build the first Indian longevity model.
            </p>
          </div>

          <div className="group relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-neutral-1000/30 sm:p-8">
            <h3 className="mb-3 text-xl font-semibold text-white">India Benefits</h3>
            <p className="leading-relaxed text-neutral-900">
              Together, we build the first comprehensive Indian longevity model to solve diseases specific to our population.
            </p>
          </div>
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
