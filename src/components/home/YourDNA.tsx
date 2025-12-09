import { memo } from "react";
import { Button } from "@/components/ui/button";

export const YourDNA = memo(function YourDNA() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl lg:text-5xl">
            Your DNA Doesn't Change.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 sm:text-xl">
            But what you do with it can change your life.
          </p>
        </div>

        {/* Message Card */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-2xl sm:p-12 backdrop-blur-sm">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-500/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary-500/10 blur-[80px]" />

            <div className="relative z-10">
              {/* Points Grid */}
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-12">
                {/* Point 1 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-neutral-200">
                    Better Energy
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Optimize your daily vitality with insights tailored to your genetic makeup.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-neutral-200">
                    Better Sleep
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Understand your sleep genetics to improve rest and recovery.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-neutral-200">
                    Better Metabolism
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Get personalized nutrition insights that work with your body, not against it.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold text-neutral-200">
                    Better Immunity
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    Strengthen your defenses by understanding your genetic predispositions.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 border-t border-neutral-800/60" />

              {/* Ending & CTA */}
              <div className="flex flex-col items-center text-center">
                <p className="mb-8 text-lg font-medium text-neutral-300">
                  All starting with a single test — free for early users.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30"
                  >
                    Claim Your Free DNA Report
                  </Button>
                  <p className="text-sm font-medium text-neutral-500">
                    Worth ₹1,50,000 — Limited Early Access Spots
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* After Card Text */}
          <p className="mt-12 text-center text-lg text-neutral-500">
            Join thousands of Indians upgrading their health through DNA.
          </p>
        </div>

      </div>
    </section>
  );
});
