import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const YourDNA = memo(function YourDNA() {
  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 text-center md:mb-10">
          <h2 className="mb-4 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            Your DNA Doesn't Change.
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-primary-100/90 sm:text-xl text-white/80">
            But what you do with it can change your life.
          </p>
        </div>

        {/* Message Card */}
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl sm:p-10 backdrop-blur-sm">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />

            <div className="relative z-10">
              {/* Points Grid */}
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-8">
                {/* Point 1 */}
                <div className="flex flex-col gap-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      Better Energy
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-left">
                    Optimize your daily vitality with insights tailored to your genetic makeup.
                  </p>
                </div>

                {/* Point 2 */}
                <div className="flex flex-col gap-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      Better Sleep
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-left">
                    Understand your sleep genetics to improve rest and recovery.
                  </p>
                </div>

                {/* Point 3 */}
                <div className="flex flex-col gap-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      Better Metabolism
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-left">
                    Get personalized nutrition insights that work with your body, not against it.
                  </p>
                </div>

                {/* Point 4 */}
                <div className="flex flex-col gap-2 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-white">
                      Better Immunity
                    </h3>
                  </div>
                  <p className="text-white/80 leading-relaxed text-left">
                    Strengthen your defenses by understanding your genetic predispositions.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-t border-white/20" />

              {/* Ending & CTA */}
              <div className="flex flex-col items-center text-center">
                <p className="mb-6 text-lg font-medium text-white">
                  All starting with a single test — free for early users.
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      className="h-14 px-8 text-lg shadow-xl bg-white text-primary-700 hover:bg-neutral-100 hover:text-primary-800 border-none"
                    >
                      Claim Your Free DNA Report
                    </Button>
                  </Link>
                  <p className="text-sm font-medium text-white/70">
                    Worth ₹1,50,000 — Limited Early Access Spots
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* After Card Text */}
          <p className="mt-8 text-center text-lg text-white/80">
            Join thousands of Indians upgrading their health through DNA.
          </p>
        </div>

      </div>
    </section>
  );
});
